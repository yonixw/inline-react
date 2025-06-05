import {
  Button,
  Card,
  DatePicker,
  Divider,
  Flex,
  InputNumber,
  Space,
  TimePicker,
} from "antd";
const { useState, useEffect, useReducer } = window.React;

import dayjs from "dayjs";
//import customParseFormat from "dayjs/plugin/customParseFormat";
//dayjs.extend(customParseFormat);
const dateFormat = "YYYY-MM-DD";
const time24hFormat = "HH:mm";
// minDate
//   <TimePicker defaultValue={dayjs('12:08', format)} format={format} />
//   const [value, setValue] = useState<Dayjs | null>(null);
// dayjs("2019-08-01", dateFormat);

export const CreateTimer = () => {
  const [hr, setHr] = useState(0);
  const [min, setMin] = useState(5);

  const [target, setTarget] = useState(
    dayjs().add(min, "minutes").add(hr, "hours")
  );
  const _now_dayjs = dayjs();

  const updateAfterIn = (m, h) => {
    setTarget(dayjs().add(m, "minutes").add(h, "hours"));
  };

  const updateAfterAt = (_new_target: dayjs.Dayjs) => {
    // On date change, make sure time stays:
    _new_target = _new_target.set("hour", target.get("hour"));
    _new_target = _new_target.set("minute", target.get("minute"));

    // Update
    setTarget(_new_target);

    // Get diffs
    const _now = dayjs();
    let _total_min_diff = _new_target.diff(_now, "minute");
    let _min_diff = _total_min_diff % 60;
    let _hour_diff = (_total_min_diff - _min_diff) / 60;
    setHr(_hour_diff);
    setMin(_min_diff + 1); // +1 because rounding errors...
  };

  return (
    <Card
      title={
        <Flex justify="space-between">
          <span>⏰ Create Timer</span>
          <Button type="primary">+ Create</Button>
        </Flex>
      }
      variant="outlined"
      style={{
        width: 350,
      }}
    >
      <Flex justify="center">
        <Space>
          <span>In:</span>

          <InputNumber
            min={0}
            step={1}
            changeOnWheel={true}
            value={hr}
            onChange={(v) => {
              updateAfterIn(min, v);
              setHr(v || 0);
            }}
          ></InputNumber>
          <span>Hr</span>

          <InputNumber
            min={0}
            step={1}
            changeOnWheel={true}
            value={min}
            onChange={(v) => {
              updateAfterIn(v, hr);
              setMin(v || 0);
            }}
          ></InputNumber>
          <span>Min</span>
        </Space>
      </Flex>
      <Divider>OR</Divider>
      <Flex justify="center">
        <Space>
          <span>At:</span>
          <DatePicker
            allowClear={false}
            minDate={_now_dayjs}
            value={target}
            onChange={updateAfterAt}
          />
          <TimePicker
            allowClear={false}
            minDate={_now_dayjs}
            hourStep={1}
            minuteStep={1}
            needConfirm={true}
            format={time24hFormat}
            value={target}
            onChange={updateAfterAt}
          />
        </Space>
      </Flex>
    </Card>
  );
};
