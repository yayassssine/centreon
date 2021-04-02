interface DsData {
  ds_color_line: string;
  ds_filled: boolean;
  ds_color_area: string;
  ds_transparency: number;
  ds_invert: string | null;
  ds_stack: string | null;
  ds_order: string | null;
  ds_legend: string | null;
  ds_average: string | null;
  ds_min: string | null;
  ds_max: string | null;
}

export interface Metric {
  data: Array<number>;
  ds_data: DsData;
  metric: string;
  unit: string;
  legend: string;
}

export interface GraphData {
  global;
  metrics: Array<Metric>;
  times: Array<string>;
}

export interface TimeValue {
  timeTick: string;
  [field: string]: string | number;
}

export interface Line {
  name: string;
  color: string;
  metric: string;
  display: boolean;
  areaColor: string;
  min: string | null;
  max: string | null;
  average: string | null;
  unit: string;
  lineColor: string;
  filled: boolean;
  transparency: number;
  highlight?: boolean;
  invert: string | null;
  stackOrder: number | null;
  legend: string | null;
}

export interface AdjustTimePeriodProps {
  start: Date;
  end: Date;
}

export enum GraphOptionId {
  displayTooltips = 'displayTooltips',
  displayEvents = 'displayEvents',
}
