import {
  useDimensionDelayConfig,
  useDimension,
} from "../LayoutEngine/hooks/useDimension"

const useResponsiveWidth = (
  width: number,
  { timeout = 150 }: useDimensionDelayConfig = {
    timeout: 150,
  }
) => {
  return useDimension({ timeout: 0 }).width * (width / 100)
}

export default useResponsiveWidth
