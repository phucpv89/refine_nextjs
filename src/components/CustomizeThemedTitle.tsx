import { ThemedTitleV2, useThemedLayoutContext } from "@refinedev/antd";

export default function CustomizeThemedTitle({ isOnSlider = false }) {
  const { siderCollapsed } = useThemedLayoutContext();
  return (
    <ThemedTitleV2
      collapsed={isOnSlider ? siderCollapsed : false}
      text="Provincial Source Information System"
    />
  );
}
