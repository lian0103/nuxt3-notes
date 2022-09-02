<script setup>
import * as d3 from 'd3';

const { data, boxWidth } = defineProps({
  data: { type: Array, default: null },
});

function drawGanttChart(taskArray, boxWidth) {
  const typeArr = [...taskArray.map((item) => item.type)];
  const categories = typeArr.filter((ele, pos) => typeArr.indexOf(ele) == pos);
  const calcCateGoryitemNum = (category) => {
    return taskArray.filter((item) => item.type == category).length;
  };
  const colorMap = {
    SI: '#859eff',
    GTUI: '#00b9fa',
    learning:'#e370dd',
    development: '#00b9fa',
    coding: '#859eff',
    promotion: '#e370dd',
    celebration: '#ff3c83',
  };
  const categoryTitleXY = {};
  const categoryYstar = {};
  const barsXY = {};
  const xAxisPos = [];

  const isOver600Width = boxWidth > 600;

  document
    .getElementById('d3-container')
    .setAttribute(
      'style',
      `width:${isOver600Width ? boxWidth : window.innerWidth - 20}px`
    );

  const width = boxWidth;
  const height = isOver600Width
    ? parseInt(boxWidth * 0.4)
    : parseInt(boxWidth * 0.45);
  const bgLineHeight = parseInt(height - 20);
  const topOffset = 0;
  const leftOffset = parseInt(boxWidth / 8);
  const rightOffset = parseInt(boxWidth / 20);
  const barHeight = parseInt(boxWidth / 34);

  // xAxis calc
  var series = taskArray.map((item, i) => ({
    ...item,
    idx: i,
    start: new Date(item.startTime),
    end: new Date(item.endTime),
  }));

  var xExtent = [
    d3.min(series, (serie) => serie.start),
    d3.max(series, (serie) => serie.end),
  ];
  var xScale = d3
    .scaleTime()
    .range([0, width - leftOffset - rightOffset])
    .domain(xExtent);
  const formatDate = d3.timeFormat(isOver600Width ? '%Y/%m/%d' : '%m/%d');
  var xAxis = d3.axisBottom(xScale).tickFormat(formatDate);

  //start
  const svg = d3
    .select('#d3-container')
    .append('svg')
    .attr('width', width)
    .attr('height', height + 20);

  const xAxisLayer = svg.append('g');
  const titleLayer = svg.append('g');
  const barlineLayer = svg.append('g');
  const categoryLayer = svg.append('g');
  const barsLayer = svg.append('g').attr('id', 'barsRects');
  const barsTextLayer = svg.append('g').attr('id', 'barsTexts');

  const bindToolTipEvent = function (selecten, selectenItemId, isLeaveOff) {
    selecten.each((item, i) => {
      svg
        .select(`#${selectenItemId}-${i}`)
        .on('mouseover', (e) => {
          let gapMiddle = (xScale(item.end) - xScale(item.start)) / 2;
          let tipHtml = `task:${item.task} <br/>
           type:${item.type}  <br/>
           ${item.details || ''}`;

          let tooltip = document.getElementById('tooltip');
          tooltip.innerHTML = tipHtml;
          tooltip.style.top =
            barsXY[i].y + (window.innerWidth < 600 ? 20 : 40) + 'px';
          tooltip.style.left = barsXY[i].x + gapMiddle + 'px';
          tooltip.style.display = 'block';
        })
        .on('mouseout', function () {
          if (isLeaveOff) {
            var tooltip = document.getElementById('tooltip');
            tooltip.style.display = 'none';
          }
        });
    });
  };

  //bgLine
  barlineLayer
    .selectAll('rect')
    .data(series)
    .join('rect')
    .attr('x', (d, i) => {
      xAxisPos[i] = leftOffset + xScale(d.end);
      return xAxisPos[i];
    })
    .attr('y', topOffset)
    .attr('width', 1)
    .attr('height', bgLineHeight)
    .attr('fill', 'gray');

  //xAxis title
  titleLayer
    .append('text')
    .text(isOver600Width ? '年/月/日' : '月/日')
    .attr('x', leftOffset - 40)
    .attr('y', height)
    .attr('text-anchor', 'middle')
    .attr('font-size', isOver600Width ? 14 : 12)
    .attr('fill', 'gray');

  //xAxis
  xAxisLayer
    .call(xAxis)
    .attr('transform', `translate(${leftOffset},${height})`);

  //categories rect
  let yStart = topOffset;
  categoryLayer
    .selectAll('rect')
    .data(categories)
    .join((enter) => {
      enter
        .append('rect')
        .attr('x', 0)
        .attr('y', (d, i) => {
          // console.log(d, i, calcCateGoryitemNum(d));
          let thisTypeHeight = barHeight * calcCateGoryitemNum(d);
          yStart += thisTypeHeight;

          categoryTitleXY[d] = {
            x: 10,
            y: yStart - (barHeight * calcCateGoryitemNum(d)) / 2,
          };
          categoryYstar[d] = yStart - thisTypeHeight;

          return yStart - thisTypeHeight;
        })
        .attr('width', leftOffset + xScale(series[series.length - 1].end))
        .attr('height', (d) => barHeight * calcCateGoryitemNum(d))
        .attr('fill', (d) => colorMap[d])
        .attr('opacity', 0.2);
    });

  //category text
  categoryLayer
    .selectAll('text')
    .data(categories)
    .join((enter) => {
      enter
        .append('text')
        .attr('x', (d) => categoryTitleXY[d].x)
        .attr('y', (d) => categoryTitleXY[d].y)
        .attr('font-size', isOver600Width ? 14 : 12)
        .attr('text-anchor', 'start')
        .attr('text-height', 14)
        .attr('fill', (d) => colorMap[d])
        .text((d) => d);
    });

  //bars
  barsLayer
    .selectAll('rect')
    .data(series)
    .join((enter) => {
      return enter
        .append('rect')
        .attr('x', (d, i) => {
          barsXY[i] = { x: leftOffset + xScale(d.start) };
          return leftOffset + xScale(d.start);
        })
        .attr('width', (d) => {
          return xScale(d.end) - xScale(d.start);
        })
        .attr('y', (d, i) => {
          barsXY[i] = { ...barsXY[i], y: topOffset + barHeight * i };
          return topOffset + barHeight * i;
        })
        .attr('height', barHeight)
        .attr('fill', (d) => colorMap[d.type])
        .attr('id', (d) => `barsRectsItem-${d.idx}`);
    });

  //bars text
  barsTextLayer
    .selectAll('text')
    .data(series)
    .join((enter) => {
      enter
        .append('text')
        .attr('x', (d, i) => {
          return barsXY[i].x + 10;
        })
        .attr('y', (d, i) => {
          return barHeight > 25 ? barsXY[i].y + 16 : barsXY[i].y + 12;
        })
        .attr('font-size', isOver600Width ? 14 : 12)
        .attr('text-anchor', 'start')
        .attr('text-height', 14)
        .attr('fill', '#fff')
        .text((d) => d.task)
        .attr('id', (d) => `barsTextItem-${d.idx}`);
    });

  // handle event binding
  const barsRectsSelecten = d3.select('#barsRects').selectAll('rect');
  const barsTextsSelecten = d3.select('#barsTexts').selectAll('text');
  bindToolTipEvent(barsRectsSelecten, 'barsRectsItem', true);
  bindToolTipEvent(barsTextsSelecten, 'barsTextItem', false);
}

onMounted(() => {
  const boxWidth =
    parseInt(window.innerWidth) > 600
      ? parseInt(window.innerWidth) > 1280
        ? 1000
        : parseInt(window.innerWidth) - 20
      : 600;

    drawGanttChart(data, boxWidth);
});
</script>

<template>
  <div id="d3-container">
    <div id="tooltip"></div>
  </div>
</template>

<style scoped>
#d3-container {
  position: relative;
  overflow: visible;
  margin: auto;
}

#tooltip {
  color: white;
  background: #fa283d;
  width: 150px;
  position: absolute;
  display: none;
  padding: 3px 6px;
  margin-left: -90px;
}

#tooltip:before {
  border: solid transparent;
  content: ' ';
  height: 0;
  left: 50%;
  margin-left: -5px;
  position: absolute;
  width: 0;
  border-width: 10px;
  font-size: 14px;
  border-bottom-color: #fa283d;
  top: -20px;
}

@media screen and (max-width: 600px) {
  #d3-container {
    overflow-x: scroll !important;
  }
  #tooltip {
    font-size: 12px;
  }
  #tooltip:before {
    top: -18px;
  }
}
</style>
