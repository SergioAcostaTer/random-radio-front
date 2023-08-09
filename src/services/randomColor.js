function randomColor() {
  const colors = [
    "#FF5733",
    "#FFBD33",
    "#33FFA6",
    "#337DFF",
    "#B433FF",
    "#FF33E9",
    "#33FF33",
    "#33D4FF",
    "#FF33A3",
    "#FF5733",
    "#FFBD33",
    "#33FFA6",
    "#337DFF",
    "#B433FF",
    "#FF33E9",
    "#33FF33",
    "#33D4FF",
    "#FF33A3",
    "#FF5733",
    "#FFBD33",
    "#33FFA6",
    "#337DFF",
    "#B433FF",
    "#FF33E9",
    "#33FF33",
    "#33D4FF",
    "#FF33A3",
    "#FF5733",
    "#FFBD33",
    "#33FFA6",
    "#337DFF",
    "#B433FF",
    "#FF33E9",
    "#33FF33",
    "#33D4FF",
    "#FF33A3",
  ];

  return colors[Math.floor(Math.random() * colors.length)];
}

export default randomColor;
