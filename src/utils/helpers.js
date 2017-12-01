export const mapValueToInterval = (value, fromArr, toArr) => {
  return (value - fromArr[0]) / (fromArr[1] - fromArr[0]) * (toArr[1] - toArr[0]) + toArr[0];
};
