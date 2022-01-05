import React from "react";
import { Raw } from "types";
import { Select } from "antd";

// 学习如何透传参数到一个第三方组件
// 学会如何透传 9-1
type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: Raw | null | undefined;
  onChange: (value?: number) => void;
  defaultOptionName?: string;
  options?: { name: string; id: number }[];
}


/**
 * value可以传入多种类型的值
 * onChange只会回调 number|undefined类型
 * 当 isNaN(Number(value))为true的时候，代表选择默认类型
 * @param props
 */

export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultOptionName ? (
        <Select.Option value={0}>{defaultOptionName}</Select.Option>
      ) : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
