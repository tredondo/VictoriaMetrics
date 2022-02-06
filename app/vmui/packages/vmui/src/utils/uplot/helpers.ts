import uPlot, {Axis} from "uplot";
import numeral from "numeral";
import {getColorFromString} from "../color";

export const defaultOptions = {
  height: 500,
  legend: {
    show: false
  },
  cursor: {
    drag: {
      x: false,
      y: false
    },
    focus: {
      prox: 30
    },
    points: {
      size: 5.6,
      width: 1.4
    },
    bind: {
      mouseup: (): null => null,
      mousedown: (): null => null,
      click: (): null => null,
      dblclick: (): null => null,
      mouseenter: (): null => null
    }
  },
};

export const formatTicks = (u: uPlot, ticks: number[], unit?: string): (string | number)[] => {
  return ticks.map(n => {
    const formatNumber = n >= 1000 ? numeral(n).format("0.0a") : n;
    return `${formatNumber} ${(unit || "")}`;
  });
};

interface AxisExtend extends Axis {
  _size?: number;
}

export const sizeAxis = (u: uPlot, values: string[], axisIdx: number, cycleNum: number): number => {
  const axis = u.axes[axisIdx] as AxisExtend;

  if (cycleNum > 1) return axis._size || 60;

  let axisSize = (axis?.ticks?.size || 0) + (axis.gap || 0);

  const longestVal = (values ?? []).reduce((acc, val) => val.length > acc.length ? val : acc, "");
  if (longestVal != "") axisSize += u.ctx.measureText(longestVal).width / devicePixelRatio;

  return Math.ceil(axisSize);
};

export const getColorLine = (scale: number, label: string): string => getColorFromString(`${scale}${label}`);

export const getDashLine = (group: number): number[] => group <= 1 ? [] : [group*4, group*1.2];
