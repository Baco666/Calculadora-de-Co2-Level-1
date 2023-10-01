var CO2 = "CO2",
  COO = CO2.replace(/\d+/g, "<sub>$&</sub>");

const modeSelect = document.getElementById("mode-select");

// get inputs for each mode
const shipInputs = document.getElementById("shipInputs");
const trainInputs = document.getElementById("trainInputs");
const roadInputs = document.getElementById("roadInputs");
const equipmentInputs = document.getElementById("equipmentInputs");

// hide all mode inputs by default
shipInputs.style.display = "none";
trainInputs.style.display = "none";
roadInputs.style.display = "none";
equipmentInputs.style.display = "none";

// function to show inputs for selected mode
function showInputs() {
  const selectedMode = modeSelect.value;
  if (selectedMode === "ship") {
    shipInputs.style.display = "block";
    trainInputs.style.display = "none";
    roadInputs.style.display = "none";
    equipmentInputs.style.display = "none";
  } else if (selectedMode === "train") {
    trainInputs.style.display = "block";
    shipInputs.style.display = "none";
    roadInputs.style.display = "none";
    equipmentInputs.style.display = "none";
  } else if (selectedMode === "road") {
    roadInputs.style.display = "block";
    trainInputs.style.display = "none";
    shipInputs.style.display = "none";
    equipmentInputs.style.display = "none";
  } else if (selectedMode === "portEquiment") {
    equipmentInputs.style.display = "block";
    roadInputs.style.display = "none";
    trainInputs.style.display = "none";
    shipInputs.style.display = "none";
  } else {
    // hide all mode inputs if no mode is selected
    shipInputs.style.display = "none";
    trainInputs.style.display = "none";
    roadInputs.style.display = "none";
    equipmentInputs.style.display = "none";
  }
}
// call showInputs() whenever the mode select value changes
modeSelect.addEventListener("change", showInputs);

function calculateShipEmissions(
  shipType,
  shipSize,
  motorType,
  shipSpeed,
  fuelType,
  daysAtSea
) {
  let shipEmissions = 0;
  let cruiseEmissions = 0;
  let hotelingEmissions = 0;
  let manuveringEmissions = 0;
  let potenciaPrincipal = 0;
  let potenciaSecundaria = 0;
  let EFprincCruise = 0;
  let EFauxCruise = 0;
  let EFprincManuvering = 0;
  let EFauxManuvering = 0;
  let EFprincHoteling = 0;
  let EFauxHoteling = 0;
  const cruisingTime = 24 * daysAtSea;
  let hotellingTime = 0;
  let manuveringTime = 0;
  let princLoadCruise = 0;
  let princLoadManuvering = 0;
  let princLoadHoteling = 0;
  let auxLoadCruise = 0;
  let auxLoadManuvering = 0;
  let auxLoadHoteling = 0;
  let EFfuel = 0;
  let coefBioFuel = 0;

  if (shipType === "tanker") {
    potenciaPrincipal = 14.755 * shipSize ** 0.6082;
    potenciaSecundaria = potenciaPrincipal * 0.3;
    hotellingTime = 38;
    manuveringTime = 1.0;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.4;
  } else if (shipType === "bulk-carrier") {
    potenciaPrincipal = 35.912 * shipSize ** 0.5276;
    potenciaSecundaria = potenciaPrincipal * 0.3;
    hotellingTime = 52;
    manuveringTime = 1.0;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.6;
  } else if (shipType === "container-ship") {
    potenciaPrincipal = 2.9165 * shipSize ** 0.8719;
    potenciaSecundaria = potenciaPrincipal * 0.25;
    hotellingTime = 14;
    manuveringTime = 1.0;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.6;
  } else if (shipType === "general-cargo-ship") {
    potenciaPrincipal = 5.56482 * shipSize ** 0.7425;
    potenciaSecundaria = potenciaPrincipal * 0.23;
    hotellingTime = 39;
    manuveringTime = 1.0;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.6;
  } else if (shipType === "ro-ro-ship") {
    potenciaPrincipal = 164.578 * shipSize ** 0.435;
    potenciaSecundaria = potenciaPrincipal * 0.24;
    hotellingTime = 15;
    manuveringTime = 1;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.6;
  } else if (shipType === "fishing-ship") {
    potenciaPrincipal = 9.75891 * shipSize ** 0.7527;
    potenciaSecundaria = potenciaPrincipal * 0.39;
    hotellingTime = 60;
    manuveringTime = 0.5;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.6;
  } else if (shipType === "port-vessel") {
    potenciaPrincipal = 54.2171 * shipSize ** 0.642;
    potenciaSecundaria = potenciaPrincipal * 0.1;
    hotellingTime = 0;
    manuveringTime = 0.5;
    //Fatore de carga de cada motor em cd para da viagem
    princLoadCruise = 0.8;
    princLoadManuvering = 0.2;
    princLoadHoteling = 0.2;
    auxLoadCruise = 0.3;
    auxLoadManuvering = 0.5;
    auxLoadHoteling = 0.6;
  }

  if (motorType == "diesel") {
    if (fuelType == "BFO") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 3.114;
      if (shipSpeed == "fast") {
        // Fatores de emissão de cada motor em cada parte da viagem (kgfuel/kWh)
        EFprincCruise = 0.214;
        EFauxCruise = 0.283;
        EFprincManuvering = 0.318;
        EFauxManuvering = 0.235;
        EFprincHoteling = 0.318;
        EFauxHoteling = 0.235;
      } else if (shipSpeed == "medium") {
        // Fatores de emissão de cada motor em cada parte da viagem (kgfuel/kWh)
        EFprincCruise = 0.185;
        EFauxCruise = 0.245;
        EFprincManuvering = 0.275;
        EFauxManuvering = 0.203;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "slow") {
        // Fatores de emissão de cada motor em cada parte da viagem (kgfuel/kWh)
        EFprincCruise = 0.187;
        EFauxCruise = 0.245;
        EFprincManuvering = 0.277;
        EFauxManuvering = 0.203;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      }
    } else if (fuelType == "MDO/MGO") {
      // Fator de emissão do combustível (kgCO2/kgfuel)
      EFfuel = 3.206;
      if (shipSpeed == "fast") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.205;
        EFauxCruise = 0.271;
        EFprincManuvering = 0.304;
        EFauxManuvering = 0.224;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "medium") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.177;
        EFauxCruise = 0.234;
        EFprincManuvering = 0.263;
        EFauxManuvering = 0.194;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "slow") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.178;
        EFauxCruise = 0.234;
        EFprincManuvering = 0.265;
        EFauxManuvering = 0.194;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      }
    } else if (fuelType == "ecoBunkers") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 3.206;
      coefBioFuel = 1 - 0.1503; //coeficiente de redução das emissõs ao utilizar combustivel de Fonte renovaveis (%)
      if (shipSpeed == "fast") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.205;
        EFauxCruise = 0.271;
        EFprincManuvering = 0.304;
        EFauxManuvering = 0.224;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "medium") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.177;
        EFauxCruise = 0.234;
        EFprincManuvering = 0.263;
        EFauxManuvering = 0.194;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "slow") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.178;
        EFauxCruise = 0.234;
        EFprincManuvering = 0.265;
        EFauxManuvering = 0.194;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      }
    } else if (fuelType == "ucome") {
      // Fator de emissão do combustível (kgCO2/Lfuel)
      EFfuel = 3.206;
      coefBioFuel = 1 - 0.8975; //coeficiente de redução das emissõs ao utilizar combustivel de Fonte renovaveis (%)
      if (shipSpeed == "fast") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.205;
        EFauxCruise = 0.271;
        EFprincManuvering = 0.304;
        EFauxManuvering = 0.224;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "medium") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.177;
        EFauxCruise = 0.234;
        EFprincManuvering = 0.263;
        EFauxManuvering = 0.194;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (shipSpeed == "slow") {
        // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
        EFprincCruise = 0.178;
        EFauxCruise = 0.234;
        EFprincManuvering = 0.265;
        EFauxManuvering = 0.194;
        EFprincHoteling = EFprincManuvering;
        EFauxHoteling = EFauxManuvering;
      } else if (fuelType == "LPG") {
        // Fator de emissão do combustível (kgCO2/Kgfuel)
        EFfuel = 2.75;
        if (shipSpeed == "fast") {
          // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
          EFprincCruise = 0.178;
          EFauxCruise = 0.236;
          EFprincManuvering = 0.265;
          EFauxManuvering = 0.196;
          EFprincHoteling = EFprincManuvering;
          EFauxHoteling = EFauxManuvering;
        } else if (shipSpeed == "medium") {
          // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
          EFprincCruise = 0.154;
          EFauxCruise = 0.204;
          EFprincManuvering = 0.229;
          EFauxManuvering = 0.169;
          EFprincHoteling = EFprincManuvering;
          EFauxHoteling = EFauxManuvering;
        } else if (shipSpeed == "slow") {
          // Fatores de emissão de cada motor em cada parte da viagem (gfuel/kWh)
          EFprincCruise = 0.156;
          EFauxCruise = 0.204;
          EFprincManuvering = 0.229;
          EFauxManuvering = 0.169;
          EFprincHoteling = EFprincManuvering;
          EFauxHoteling = EFauxManuvering;
        }
      }
    }
  }
  if (motorType == "steam") {
    if (fuelType == "BFO") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 3.114;
      EFprincCruise = 0.305;
      EFauxCruise = 0.305;
      EFprincManuvering = 0.336;
      EFauxManuvering = 0.3336;
      EFprincHoteling = EFprincManuvering;
      EFauxHoteling = EFauxManuvering;
    } else if (fuelType == "MDO/MGO") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 3.206;
      EFprincCruise = 0.29;
      EFauxCruise = 0.29;
      EFprincManuvering = 0.319;
      EFauxManuvering = 0.319;
      EFprincHoteling = EFprincManuvering;
      EFauxHoteling = EFauxManuvering;
    } else if (fuelType == "ecoBunkers") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 3.206;
      coefBioFuel = 1 - 0.1503; //coeficiente de redução das emissõs ao utilizar combustivel de Fonte renovaveis (%)
      EFprincCruise = 0.29;
      EFauxCruise = 0.29;
      EFprincManuvering = 0.319;
      EFauxManuvering = 0.319;
      EFprincHoteling = EFprincManuvering;
      EFauxHoteling = EFauxManuvering;
    } else if (fuelType == "ucome") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 3.206;
      coefBioFuel = 1 - 0.8975; //coeficiente de redução das emissõs ao utilizar combustivel de Fonte renovaveis (%)
      EFprincCruise = 0.29;
      EFauxCruise = 0.29;
      EFprincManuvering = 0.319;
      EFauxManuvering = 0.319;
      EFprincHoteling = EFprincManuvering;
      EFauxHoteling = EFauxManuvering;
    } else if (fuelType == "LPG") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 2.75;
      const LHVLPG = 13.83; //low heating value of LPG (kwh/kgfuel)
      //função calcular emissions de viagem
      cruiseEmissions =
        (EFfuel / LHVLPG) *
        cruisingTime *
        (potenciaPrincipal * princLoadCruise +
          potenciaSecundaria * auxLoadCruise);
      //cálculo das emissions na fase de hoteling
      hotelingEmissions =
        ((EFfuel * hotellingTime) / LHVLPG) *
          (potenciaPrincipal * princLoadHoteling) +
        potenciaSecundaria * auxLoadHoteling;
      //cálculo das emissions na fase de manobras
      manuveringEmissions =
        ((EFfuel * manuveringTime) / LHVLPG) *
          (potenciaPrincipal * princLoadManuvering) +
        potenciaSecundaria * auxLoadManuvering;
      //somatorio das tres etapas da viagem
      shipEmissions = cruiseEmissions + hotelingEmissions + manuveringEmissions;
    }
    if (fuelType == "methanol") {
      // Fator de emissão do combustível (kgCO2/Kgfuel)
      EFfuel = 1.375;
      const LHVmeth = 6.39; //low heating value of methanol (kwh/kgfuel)
      //função calcular emissions de viagem

      cruiseEmissions =
        (EFfuel / LHVmeth) *
        cruisingTime *
        (potenciaPrincipal * princLoadCruise +
          potenciaSecundaria * auxLoadCruise);
      //cálculo das emissions na fase de hoteling
      hotelingEmissions =
        ((EFfuel * hotellingTime) / LHVmeth) *
          (potenciaPrincipal * princLoadHoteling) +
        potenciaSecundaria * auxLoadHoteling;
      //cálculo das emissions na fase de manobras
      manuveringEmissions =
        ((EFfuel * manuveringTime) / LHVmeth) *
          (potenciaPrincipal * princLoadManuvering) +
        potenciaSecundaria * auxLoadManuvering;
      //somatorio das tres etapas da viagem
      shipEmissions = cruiseEmissions + hotelingEmissions + manuveringEmissions;
    }
  }

  //função calcular emissions de viagem

  cruiseEmissions =
    EFfuel *
    cruisingTime *
    (potenciaPrincipal * EFprincCruise * princLoadCruise +
      potenciaSecundaria * EFauxCruise * auxLoadCruise);

  //cálculo das emissions na fase de hoteling
  hotelingEmissions =
    EFfuel *
      hotellingTime *
      (potenciaPrincipal * EFprincHoteling * princLoadHoteling) +
    potenciaSecundaria * EFauxHoteling * auxLoadHoteling;

  //cálculo das emissions na fase de manobras
  manuveringEmissions =
    EFfuel *
      manuveringTime *
      (potenciaPrincipal * EFprincManuvering * princLoadManuvering) +
    potenciaSecundaria * EFauxManuvering * auxLoadManuvering;

  //somatorio das tres etapas da viagem
  shipEmissions = cruiseEmissions + hotelingEmissions + manuveringEmissions;
  if (fuelType === "ecoBunkers" || fuelType == "ucome") {
    //somatorio das tres etapas da viagem
    shipEmissions =
      (cruiseEmissions + hotelingEmissions + manuveringEmissions) * coefBioFuel;
  }
  shipEmissions = shipEmissions.toFixed(2);
  // Display emissions on the webpage
  document.getElementById("emissionsResult").innerHTML =
    `Resultado (Result): ${shipEmissions} kg de ` + COO;
}

//funcção calcular emissions de comboios
function calculateTrainEmissions(trainFuel, trainHoras, trainLoad, trainPower) {
  let trainEmissions = 0;
  let loadFactor = 0;

  if (trainLoad === "full") {
    loadFactor = 1;
  } else if (trainLoad === "empty") {
    loadFactor = 0.3;
  } else if (trainLoad === "half") {
    loadFactor = 0.5;
  }

  if (trainFuel === "diesel") {
    const lowHeatingValue = 11.944; // [kWh/kg fuel]
    const emissionFactor = 3.169 * (1 - 0.07081); // [kg CO2/kg fuel]
    trainEmissions =
      (trainHoras * trainPower * loadFactor * emissionFactor) / lowHeatingValue;
  } else if (trainFuel === "biodiesel") {
    const lowHeatingValue = 10.278; // [kWh/kg fuel]
    const emissionFactor = 3.169 * (1 - 0.8975); // [kg CO2/kg fuel]
    trainEmissions =
      (trainHoras * trainPower * loadFactor * emissionFactor) / lowHeatingValue;
  } else if (trainFuel === "eletricity") {
    const energyMixFactor = 0.14868; // [Kg CO2/KWh]
    trainEmissions = trainHoras * trainPower * energyMixFactor * loadFactor;
  }
  console.log(trainEmissions, trainHoras, trainPower, loadFactor);
  trainEmissions = trainEmissions.toFixed(2);
  // Display emissions on the webpage
  document.getElementById("emissionsResult").innerHTML =
    `Resultado (Result): ${trainEmissions} kg de ` + COO;
}
const loadfactor = {
  "Before 1981": { full: 1.01, half: 1.095, empty: 1.18 },
  "1981-1990": {
    full: 1.01,
    half: 1.095,
    empty: 1.18,
  },
  "1991-1998": {
    full: 1.01,
    half: 1.095,
    empty: 1.18,
  },
  "Stage I": {
    full: 1.01,
    half: 1.095,
    empty: 1.18,
  },
  "Stage II": {
    full: 1.01,
    half: 1.095,
    empty: 1.18,
  },
  "Stage IIIA": { full: 1.01, half: 1.095, empty: 1.18 },
  "Stage IIIB": { full: 1, half: 1, empty: 1 },
  "Stage IV": { full: 1, half: 1, empty: 1 },
  "Stage V": { full: 1, half: 1, empty: 1 },
};
//funcção calcular emissions de equipmaentos portuarios
function calculateEquipmentEmissions(
  equipmentType,
  equiLoad,
  equipmentPower,
  equipmentActivity,
  equipmentYear,
  engineSize
) {
  let equipmentEmissions = 0;

  const stage = getEmissionStage(equipmentYear);
  const loadFactor = loadfactor[stage][equiLoad];

  if (equipmentType === "LPG") {
    const equiEF = 3.024; //[kgCO2/kgfuel]
    const equiConsumption = 0.311; //[kgfuel/kWh]
    equipmentEmissions =
      equiConsumption *
      equipmentPower *
      equipmentActivity *
      loadFactor *
      equiEF;
  }

  if (equipmentType === "eletricity") {
    const energyMixFactor = 0.14868; // [Kg CO2/KWh]
    equipmentEmissions =
      equipmentPower * equipmentActivity * loadFactor * energyMixFactor;
  }
  if (equipmentType === "diesel") {
    const equiEF = 3.169; //[kgCO2/kgfuel]
    let equiConsumption = 0; //[Kgfuel/kWh]
    if (equipmentPower < 19) {
      if (stage === "Before 1981") {
        equiConsumption = 0.3; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.281; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.262; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 19 && equipmentPower < 37) {
      if (stage === "Before 1981") {
        equiConsumption = 0.29; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.275; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 37 && equipmentPower < 75) {
      if (stage === "Before 1981") {
        equiConsumption = 0.29; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.275; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 75 && equipmentPower < 130) {
      if (stage === "Before 1981") {
        equiConsumption = 0.28; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.268; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.255; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 130 && equipmentPower < 560) {
      if (stage === "Before 1981") {
        equiConsumption = 0.27; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.25; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 560) {
      equiConsumption = 0.25; //[Kgfuel/kWh]
    }
    equipmentEmissions =
      equiConsumption *
      equipmentPower *
      equipmentActivity *
      loadFactor *
      equiEF;
  }
  if (equipmentType === "B15") {
    const equiEF = 3.169; //[kgCO2/Kgfuel]
    let equiConsumption = 0; //[Kgfuel/kWh]
    let coefBioFuel = 1 - 0.1503; //5 de reduçao de emissons ao usar B15
    if (equipmentPower < 19) {
      if (stage === "Before 1981") {
        equiConsumption = 0.3; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.281; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.262; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 19 && equipmentPower < 37) {
      if (stage === "Before 1981") {
        equiConsumption = 0.29; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.275; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 37 && equipmentPower < 75) {
      if (stage === "Before 1981") {
        equiConsumption = 0.29; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.275; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 75 && equipmentPower < 130) {
      if (stage === "Before 1981") {
        equiConsumption = 0.28; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.268; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.255; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 130 && equipmentPower < 560) {
      if (stage === "Before 1981") {
        equiConsumption = 0.27; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.25; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 560) {
      equiConsumption = 0.25; //[Kgfuel/kWh]
    }
    equipmentEmissions =
      equiConsumption *
      equipmentPower *
      equipmentActivity *
      loadFactor *
      equiEF *
      coefBioFuel;
  }
  if (equipmentType === "B100") {
    const equiEF = 3.169; //[kgCO2/Kgfuel]
    let equiConsumption = 0; //[Kgfuel/kWh]
    let coefBioFuel = 1 - 0.8975; //5 de reduçao de emissons ao usar B15
    if (equipmentPower < 19) {
      if (stage === "Before 1981") {
        equiConsumption = 0.3; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.281; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.262; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 19 && equipmentPower < 37) {
      if (stage === "Before 1981") {
        equiConsumption = 0.29; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.275; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 37 && equipmentPower < 75) {
      if (stage === "Before 1981") {
        equiConsumption = 0.29; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.275; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 75 && equipmentPower < 130) {
      if (stage === "Before 1981") {
        equiConsumption = 0.28; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.268; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.255; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 130 && equipmentPower < 560) {
      if (stage === "Before 1981") {
        equiConsumption = 0.27; //[Kgfuel/kWh]
      } else if (stage === "1981-1990") {
        equiConsumption = 0.26; //[Kgfuel/kWh]
      } else {
        equiConsumption = 0.25; //[Kgfuel/kWh]
      }
    } else if (equipmentPower >= 560) {
      equiConsumption = 0.25; //[Kgfuel/kWh]
    }
    equipmentEmissions =
      equiConsumption *
      equipmentPower *
      equipmentActivity *
      loadFactor *
      equiEF *
      coefBioFuel;
  }
  if (equipmentType === "gasoline2stroke") {
    const equiEF = 3.169; //[kgCO2/kgfuel]
    let equiConsumption = 0.652; //[Kgfuel/kWh]
    equipmentEmissions =
      equiConsumption *
      equipmentPower *
      equipmentActivity *
      loadFactor *
      equiEF;
  }
  if (equipmentType === "gasoline4stroke") {
    const equiEF = 3.169; //[kgCO2/kgfuel]
    let equiConsumption = 0;
    if (engineSize < 66 && stage === "Before 1981") {
      equiConsumption = 0.603; //[Kgfuel/kWh]
    } else if (
      engineSize < 66 &&
      (stage === "Stage I" ||
        stage === "Stage II" ||
        stage === "Stage IIIA" ||
        stage === "Stage IIIB" ||
        stage === "Stage IV" ||
        stage === "Stage V")
    ) {
      equiConsumption = 0.475; //[Kgfuel/kWh]
    } else if (
      66 <= engineSize &&
      engineSize < 100 &&
      stage === "Before 1981"
    ) {
      equiConsumption = 0.627; //[Kgfuel/kWh]
    } else if (66 <= engineSize && engineSize < 100 && stage === "1981-1990") {
      equiConsumption = 0.599; //[Kgfuel/kWh]
    } else if (
      66 <= engineSize &&
      engineSize < 100 &&
      (stage === "Stage I" ||
        stage === "Stage II" ||
        stage === "Stage IIIA" ||
        stage === "Stage IIIB" ||
        stage === "Stage IV" ||
        stage === "Stage V")
    ) {
      equiConsumption = 0.57; //[Kgfuel/kWh]
    } else if (
      100 <= engineSize &&
      engineSize < 225 &&
      stage === "Before 1981"
    ) {
      equiConsumption = 0.601; //[Kgfuel/kWh]
    } else if (100 <= engineSize && engineSize < 225 && stage === "1981-1990") {
      equiConsumption = 0.573; //[Kgfuel/kWh]
    } else if (
      100 <= engineSize &&
      engineSize < 225 &&
      (stage === "Stage I" ||
        stage === "Stage II" ||
        stage === "Stage IIIA" ||
        stage === "Stage IIIB" ||
        stage === "Stage IV" ||
        stage === "Stage V")
    ) {
      equiConsumption = 0.546; //[Kgfuel/kWh]
    } else if (engineSize >= 225 && stage === "Before 1981") {
      equiConsumption = 0.539; //[Kgfuel/kWh]
    } else if (engineSize >= 225 && stage === "1981-1990") {
      equiConsumption = 0.514; //[Kgfuel/kWh]
    } else if (
      engineSize >= 225 &&
      (stage === "Stage I" ||
        stage === "Stage II" ||
        stage === "Stage IIIA" ||
        stage === "Stage IIIB" ||
        stage === "Stage IV" ||
        stage === "Stage V")
    ) {
      equiConsumption = 0.49; //[Kgfuel/kWh]
    }
    equipmentEmissions =
      equiConsumption *
      equipmentPower *
      equipmentActivity *
      loadFactor *
      equiEF;
  }
  equipmentEmissions = equipmentEmissions.toFixed(2);
  // Display emissions on the webpage
  document.getElementById("emissionsResult").innerHTML =
    `Resultado (Result): ${equipmentEmissions} kg de ` + COO;
}
//função de calculo das emissos rodoviarias
const roadData = {
  passengerCar: {
    dieselB7: { roadEF: 3.169 * (1 - 0.0708), roadConsumption: 0.06 },
    dieselB15: { roadEF: 3.169 * (1 - 0.1503), roadConsumption: 0.06 },
    gasolineE10: { roadEF: 3.169 * (1 - 0.122), roadConsumption: 0.07 },
    gasolineE85: { roadEF: 3.169 * (1 - 0.8282), roadConsumption: 0.0865 },
    lpg: { roadEF: 3.024, roadConsumption: 0.0575 },
    cng: { roadEF: 2.473, roadConsumption: 0.0625 },
    bioDiesel: { roadEF: 3.169 * (1 - 0.8975), roadConsumption: 0.06 },
  },
  lightCommercial: {
    dieselB7: { roadEF: 3.169 * (1 - 0.0708), roadConsumption: 0.08 },
    dieselB15: { roadEF: 3.169 * (1 - 0.1503), roadConsumption: 0.08 },
    gasolineE10: { roadEF: 3.169 * (1 - 0.122), roadConsumption: 0.1 },
    gasolineE85: { roadEF: 3.169 * (1 - 0.8282), roadConsumption: 0.1 },
    lpg: { roadEF: 3.024, roadConsumption: 0.0575 },
    cng: { roadEF: 2.473, roadConsumption: 0.0625 },
    bioDiesel: { roadEF: 3.169 * (1 - 0.8975), roadConsumption: 0.08 },
  },
  heavyCommercial: {
    dieselB7: { roadEF: 3.169 * (1 - 0.0708), roadConsumption: 0.24 },
    dieselB15: { roadEF: 3.169 * (1 - 0.1503), roadConsumption: 0.24 },
    gasolineE10: { roadEF: 3.169 * (1 - 0.122), roadConsumption: 0.177 },
    gasolineE85: { roadEF: 3.169 * (1 - 0.8282), roadConsumption: 0.177 },
    lpg: { roadEF: 3.024, roadConsumption: 0.5 },
    cng: { roadEF: 2.473, roadConsumption: 0.5 },
    bioDiesel: { roadEF: 3.169 * (1 - 0.8975), roadConsumption: 0.24 },
  },
};
function calculateRoadEmissions(
  vehicleType,
  vehicleFuelType,
  vehicleDistance,
  vehiclePower,
  travelTime
) {
  let roadEmissions = 0;
  let roadEF = 0;
  let roadConsumption = 0;

  if (vehicleFuelType == "eletric") {
    let energyMixFactor = 0.14868; // [Kg CO2/KWh]
    roadEmissions = vehiclePower * travelTime * energyMixFactor;
  } else if (vehicleFuelType in roadData[vehicleType]) {
    roadEF = roadData[vehicleType][vehicleFuelType].roadEF;
    roadConsumption = roadData[vehicleType][vehicleFuelType].roadConsumption;
    roadEmissions = roadEF * roadConsumption * vehicleDistance;
  }

  roadEmissions = roadEmissions.toFixed(2);
  document.getElementById("emissionsResult").innerHTML =
    `Resultado (Result): ${roadEmissions} kg de ` + COO;
}

//classificaçao dos equipametnos portúarios
function getEmissionStage(equipmentYear) {
  if (equipmentYear < 1981) {
    return "Before 1981";
  } else if (equipmentYear >= 1981 && equipmentYear <= 1990) {
    return "1981-1990";
  } else if (equipmentYear >= 1991 && equipmentYear <= 1998) {
    return "1991-1998";
  } else if (equipmentYear >= 1999 && equipmentYear <= 2000) {
    return "Stage I";
  } else if (equipmentYear >= 2001 && equipmentYear <= 2005) {
    return "Stage II";
  } else if (equipmentYear >= 2006 && equipmentYear <= 2009) {
    return "Stage IIIA";
  } else if (equipmentYear >= 2010 && equipmentYear <= 2013) {
    return "Stage IIIB";
  } else if (equipmentYear >= 2014 && equipmentYear <= 2019) {
    return "Stage IV";
  } else {
    return "Stage V";
  }
}

//funcionamento do butão calcultate
document
  .getElementById("calculateButton")
  .addEventListener("click", function () {
    if (modeSelect.value === "train") {
      const trainFuel = document.getElementById("trainFuel").value;
      const trainHoras = parseFloat(
        document.getElementById("trainHoras").value
      );
      const trainLoad = document.getElementById("trainLoad").value;
      const trainPower = parseFloat(
        document.getElementById("trainPower").value
      );
      calculateTrainEmissions(trainFuel, trainHoras, trainLoad, trainPower);
    } else if (modeSelect.value === "ship") {
      const shipType = document.getElementById("ship-type").value;
      const shipSize = parseFloat(document.getElementById("ship-size").value);
      const motorType = document.getElementById("motor-type").value;
      const shipSpeed = document.getElementById("ship-speed").value;
      const fuelType = document.getElementById("fuel-type").value;
      const daysAtSea = parseInt(document.getElementById("days-at-sea").value);
      console.log(
        shipType,
        shipSize,
        motorType,
        shipSpeed,
        fuelType,
        daysAtSea
      );
      calculateShipEmissions(
        shipType,
        shipSize,
        motorType,
        shipSpeed,
        fuelType,
        daysAtSea
      );
    }
    if (modeSelect.value === "portEquiment") {
      const equipmentType = document.getElementById("equipmentType").value;
      const equiLoad = document.getElementById("equiLoad").value;
      const equipmentPower = parseFloat(
        document.getElementById("equipmentPower").value
      );
      const equipmentActivity = parseFloat(
        document.getElementById("equipmentActivity").value
      );
      const equipmentYear = parseInt(
        document.getElementById("equipmentYear").value
      );
      const engineSize = parseFloat(
        document.getElementById("engineSize").value
      );

      calculateEquipmentEmissions(
        equipmentType,
        equiLoad,
        equipmentPower,
        equipmentActivity,
        equipmentYear,
        engineSize
      );
    }
    if (modeSelect.value === "road") {
      const vehicleType = document.getElementById("vehicleType").value;
      const vehicleFuelType = document.getElementById("vehicleFuelType").value;
      const vehicleDistance = parseFloat(
        document.getElementById("vehicleDistance").value
      );
      const vehiclePower = parseFloat(
        document.getElementById("vehiclePower").value
      );
      const travelTime = parseFloat(
        document.getElementById("travelTime").value
      );

      calculateRoadEmissions(
        vehicleType,
        vehicleFuelType,
        vehicleDistance,
        vehiclePower,
        travelTime
      );
    }
  });
var navigateButton = document.getElementById("level2Button");
navigateButton.addEventListener("click", function () {
  // Redirect to the desired page
  window.location.href = "http://127.0.0.1:5500/Level%202/index.html";
});
var navigate3Button = document.getElementById("level3Button");
navigate3Button.addEventListener("click", function () {
  // Redirect to the desired page
  window.location.href = "http://127.0.0.1:5500/level%203/index.html";
});
