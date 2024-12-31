export const generatePlate = (length = 20) => {
  return Array.from({ length }, () => {
    const cityCode = String(Math.floor(Math.random() * 81) + 1).padStart(2, "0"); // 1-81 arasında rastgele şehir kodu
    const letters = `${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(
      65 + Math.floor(Math.random() * 26)
    )}`; // İki rastgele büyük harf
    const numbers = Math.floor(Math.random() * 900 + 100); // 100-999 arası rastgele sayı
    return `${cityCode} ${letters} ${numbers}`;
  });
};


export const generateParkingData = async (numFloors = 3, spotsPerArea = 20) => {
  const areas = ["A", "B", "C", "D"]; // Alanlar
  const vehicleModels = ["Toyota Corolla", "Ford Focus", "Honda Civic", "BMW 320i", "Audi A4"];
  const vehicleColors = ["Red", "Blue", "White", "Black", "Gray"];
  const plates = await generatePlate(numFloors * areas.length * spotsPerArea); // Plaka sayısını hazırla

  const parkingData = [];
  for (let floor = 1; floor <= numFloors; floor++) {
    for (let area of areas) {
      const occupiedSpots = new Set(
        Array.from({ length: Math.floor(Math.random() * 6) + 10 }, () =>
          Math.floor(Math.random() * spotsPerArea) + 1
        )
      );


      for (let i = 1; i <= spotsPerArea; i++) {
        const isOccupied = occupiedSpots.has(i);
        const status = isOccupied ? "occupied" : "available";
        let vehicle = null;
        let timestamp = null;

        if (isOccupied) {
          vehicle = {
            plate: plates[Math.floor(Math.random() * plates.length)],
            model: vehicleModels[Math.floor(Math.random() * vehicleModels.length)],
            color: vehicleColors[Math.floor(Math.random() * vehicleColors.length)]
          };
          timestamp = new Date(Date.now() - Math.floor(Math.random() * 7200000)).toISOString(); // 2 saat içinde rastgele zaman
        }

        parkingData.push({
          floor: `floor${floor}`,
          area: area,
          id: `${area}${i}`,
          name: `Spot-${area}${i}`,
          status: status,
          vehicle: vehicle,
          timestamp: timestamp
        });
      }
    }
  }


  return parkingData;
};

export const groupByFloor = async (parkingData) => {
  return await parkingData.reduce((acc, spot) => {
    const floor = spot.floor;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor].push(spot);
    return acc;
  }, {});
};