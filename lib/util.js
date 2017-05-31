export const rainbowSlice = (n) => {
  // 255 => '#0000FF'
  // 16711680 => '#FF0000'
  // 16777215 => '#FFFFFF'
  let step = (16711935 - 22015) / (n);
  let colorArray = [];
  for ( let i = 1; i < n; i++ ) {
    colorArray.push( `#${(22015 + Math.floor( step * i )).toString(16)}`);
  }

  return colorArray;
};

export const randomSlice = (n, start) => {
  // 255 => '#0000FF'
  // 16711680 => '#FF0000'
  // 16777215 => '#FFFFFF'
  let offset = start || Math.floor(Math.random() * 10000000);
  let step = (16711680 - offset) / n + 2;
  let colorArray = [];
  for ( let i = 1; i <= n; i++ ) {
    colorArray.push( `#${(offset + Math.floor( step * i )).toString(16)}`);
  }
  console.log(colorArray)
  return colorArray;
};

export const randomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};
