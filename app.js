const STORAGE_KEY = "nrm_handbook_v2_inputs";

const LOCATIONS = ["Central wheatbelt", "Eastern wheatbelt"];
const FOCUS_OPTIONS = ["Carb Block", "Carb Belt", "Bio Block", "Harv Belt"];
const SOIL_OPTIONS = ["Poor", "Good"];
const AREA_OPTIONS = [1, 10, 100];
const CARBON_PRICE_OPTIONS = ["Low (-50%)", "Standard", "High (+50%)"];
const MULTIPLIER_PRICE_OPTIONS = ["Low -50%", "Standard", "High +50%"];

const DEFAULTS = {
  location: "Central wheatbelt",
  focus: "Harv Belt",
  soil: "Good",
  area: 1,
  carbonPriceScenario: "Standard",
  biodiversityPriceScenario: "Standard",
  biomassPriceScenario: "Standard",
  includeShelter: true,
  includeCarbon: true,
  includeBiodiversity: true,
  includeBiomass: true,
  includeMicroclimate: true,
  includeErosion: true,
  includeSalinity: true,
  salinityRate: 0.0089,
  costRippingMounding: 280,
  costInitialWeed: 54,
  costFertBaseInit: 0,
  costFertExtraInitHarvest: 0,
  costSeedlings: 0.8,
  costMortality: 0.1,
  plantingRate: 3000,
  costPlantingEquipPerDay: 300,
  costPlantingLabourPerDay: 800,
  costYear1Weed: 10,
  costYear1FertBase: 0,
  costYear1FertExtraHarvest: 0,
  costOngoingWeed: 0,
  costOngoingFertBase: 0,
  costOngoingFertExtraHarvest: 0,
  costSequestrationSetupFarm: 10000,
  costSequestrationAnnualHa: 25,
  costBiodiversitySetupFarm: 10000,
  costBiodiversityAnnualHa: 25,
  costHarvestContractHr: 300,
  harvestRateTHr: 40,
  costTransportPerTKm: 0.15,
  transportDistanceKm: 60,
  carbonYieldCarbBlock: 7.43,
  carbonYieldCarbBelt: 10.4,
  carbonYieldBioBlock: 4.14,
  carbonYieldHarvBelt: 4.04,
  carbonPriceBase: 40,
  biodiversityValueCarbBlock: 17000,
  biodiversityValueCarbBelt: 8500,
  biodiversityValueBioBlock: 22500,
  biodiversityValueHarvBelt: 4500,
  biomassYieldCarbBlock: 0,
  biomassYieldCarbBelt: 0,
  biomassYieldBioBlock: 0,
  biomassYieldHarvBelt: 7.0,
  biomassPriceBase: 50,
  microIncreaseCentral: 0.03,
  microIncreaseEastern: 0.052
};

const ONE_DECIMAL_FIELDS = new Set([
  "carbonYieldCarbBlock",
  "carbonYieldCarbBelt",
  "carbonYieldBioBlock",
  "carbonYieldHarvBelt",
  "biomassYieldCarbBlock",
  "biomassYieldCarbBelt",
  "biomassYieldBioBlock",
  "biomassYieldHarvBelt"
]);

const PERCENT_FIELDS = new Set([
  "costMortality",
  "microIncreaseCentral",
  "microIncreaseEastern"
]);

const TABLES = {
  land: [
    ["Central wheatbelt", "Poor", 1, 89], ["Central wheatbelt", "Poor", 10, 89.8], ["Central wheatbelt", "Poor", 100, 98.7],
    ["Central wheatbelt", "Good", 1, 169], ["Central wheatbelt", "Good", 10, 169.7], ["Central wheatbelt", "Good", 100, 171.4],
    ["Eastern wheatbelt", "Poor", 1, 23], ["Eastern wheatbelt", "Poor", 10, 23], ["Eastern wheatbelt", "Poor", 100, 23.04],
    ["Eastern wheatbelt", "Good", 1, 159], ["Eastern wheatbelt", "Good", 10, 158.8], ["Eastern wheatbelt", "Good", 100, 160.5]
  ],
  shelter: [
    ["Central wheatbelt", "Carb Block", "Poor", 1, 1], ["Central wheatbelt", "Carb Block", "Poor", 10, 1.1], ["Central wheatbelt", "Carb Block", "Poor", 100, 1.06],
    ["Central wheatbelt", "Carb Block", "Good", 1, 1], ["Central wheatbelt", "Carb Block", "Good", 10, 1.1], ["Central wheatbelt", "Carb Block", "Good", 100, 1.1],
    ["Eastern wheatbelt", "Carb Block", "Poor", 1, 0], ["Eastern wheatbelt", "Carb Block", "Poor", 10, 0.3], ["Eastern wheatbelt", "Carb Block", "Poor", 100, 0.38],
    ["Eastern wheatbelt", "Carb Block", "Good", 1, 0], ["Eastern wheatbelt", "Carb Block", "Good", 10, 0.4], ["Eastern wheatbelt", "Carb Block", "Good", 100, 2.59],
    ["Central wheatbelt", "Carb Belt", "Poor", 1, 10], ["Central wheatbelt", "Carb Belt", "Poor", 10, 9.9], ["Central wheatbelt", "Carb Belt", "Poor", 100, 11.75],
    ["Central wheatbelt", "Carb Belt", "Good", 1, 10], ["Central wheatbelt", "Carb Belt", "Good", 10, 9.8], ["Central wheatbelt", "Carb Belt", "Good", 100, 9.65],
    ["Eastern wheatbelt", "Carb Belt", "Poor", 1, 4], ["Eastern wheatbelt", "Carb Belt", "Poor", 10, 3.3], ["Eastern wheatbelt", "Carb Belt", "Poor", 100, 3.34],
    ["Eastern wheatbelt", "Carb Belt", "Good", 1, 4], ["Eastern wheatbelt", "Carb Belt", "Good", 10, 3.4], ["Eastern wheatbelt", "Carb Belt", "Good", 100, 6.13],
    ["Central wheatbelt", "Bio Block", "Poor", 1, 2], ["Central wheatbelt", "Bio Block", "Poor", 10, 1.1], ["Central wheatbelt", "Bio Block", "Poor", 100, 1.05],
    ["Central wheatbelt", "Bio Block", "Good", 1, 1], ["Central wheatbelt", "Bio Block", "Good", 10, 1.1], ["Central wheatbelt", "Bio Block", "Good", 100, 1.08],
    ["Eastern wheatbelt", "Bio Block", "Poor", 1, 1], ["Eastern wheatbelt", "Bio Block", "Poor", 10, 0.4], ["Eastern wheatbelt", "Bio Block", "Poor", 100, 0.37],
    ["Eastern wheatbelt", "Bio Block", "Good", 1, 0], ["Eastern wheatbelt", "Bio Block", "Good", 10, 0.4], ["Eastern wheatbelt", "Bio Block", "Good", 100, 2.59],
    ["Central wheatbelt", "Harv Belt", "Poor", 1, 2], ["Central wheatbelt", "Harv Belt", "Poor", 10, 1.8], ["Central wheatbelt", "Harv Belt", "Poor", 100, 1.73],
    ["Central wheatbelt", "Harv Belt", "Good", 1, 2], ["Central wheatbelt", "Harv Belt", "Good", 10, 1.8], ["Central wheatbelt", "Harv Belt", "Good", 100, 1.77],
    ["Eastern wheatbelt", "Harv Belt", "Poor", 1, 1], ["Eastern wheatbelt", "Harv Belt", "Poor", 10, 0.6], ["Eastern wheatbelt", "Harv Belt", "Poor", 100, 0.61],
    ["Eastern wheatbelt", "Harv Belt", "Good", 1, 1], ["Eastern wheatbelt", "Harv Belt", "Good", 10, 0.6], ["Eastern wheatbelt", "Harv Belt", "Good", 100, 2.82]
  ],
  adjacent: [
    ["Central wheatbelt", "Carb Block", "Poor", -13], ["Central wheatbelt", "Carb Block", "Good", -37],
    ["Eastern wheatbelt", "Carb Block", "Poor", -20], ["Eastern wheatbelt", "Carb Block", "Good", -32],
    ["Central wheatbelt", "Carb Belt", "Poor", -132], ["Central wheatbelt", "Carb Belt", "Good", -384],
    ["Eastern wheatbelt", "Carb Belt", "Poor", -210], ["Eastern wheatbelt", "Carb Belt", "Good", -337],
    ["Central wheatbelt", "Bio Block", "Poor", -13], ["Central wheatbelt", "Bio Block", "Good", -37],
    ["Eastern wheatbelt", "Bio Block", "Poor", -20], ["Eastern wheatbelt", "Bio Block", "Good", -32],
    ["Central wheatbelt", "Harv Belt", "Poor", -120.14035087719297], ["Central wheatbelt", "Harv Belt", "Good", -188.6315789473684],
    ["Eastern wheatbelt", "Harv Belt", "Poor", -191.52809560132212], ["Eastern wheatbelt", "Harv Belt", "Good", -165.22815724173958]
  ],
  erosion: [
    ["Central wheatbelt", "Carb Block", 0], ["Central wheatbelt", "Carb Belt", 10.676349909732481],
    ["Central wheatbelt", "Bio Block", 0], ["Central wheatbelt", "Harv Belt", 4.270539963892992],
    ["Eastern wheatbelt", "Carb Block", 0], ["Eastern wheatbelt", "Carb Belt", 27.242901690464468],
    ["Eastern wheatbelt", "Bio Block", 0], ["Eastern wheatbelt", "Harv Belt", 10.897160676185788]
  ],
  micro: [
    ["Central wheatbelt", 8.90254124887262], ["Eastern wheatbelt", 25.54533396997188]
  ],
  salinity: [
    ["Central wheatbelt", -3444], ["Eastern wheatbelt", -3938]
  ],
  controlRecharge: [
    ["Central wheatbelt", 16.137], ["Eastern wheatbelt", 12.331]
  ],
  density: {
    "Carb Block": { trees: 512, shrubs: 0 },
    "Carb Belt": { trees: 1000, shrubs: 0 },
    "Bio Block": { trees: 267, shrubs: 300 },
    "Harv Belt": { trees: 1000, shrubs: 0 }
  },
  carbonProfiles: {
    "Carb Block": [0, 904.6083226874861, 301.17203770330394, 2044.9880223868902, 4934.14176790453, 7509.71218833369, 9267.0510285643, 10283.526955063298, 10762.4917562868, 10882.192396325401, 10771.241360873602, 10516.723292713294, 10176.308121573002, 9787.904794484504, 9376.349902657892, 8957.839288456, 8542.830830710003, 8137.950178506003, 7747.251848844997, 7373.0618431860075, 7016.545955459009, 6678.096151333989, 6357.594844373011, 6054.596317329981, 5768.451385484013, 5498.392878909982],
    "Carb Belt": [0, 1266.4516517624804, 421.6408527846254, 2862.983231341646, 6907.798475066342, 10513.597063667165, 12973.87143999002, 14396.937737088614, 15067.488458801521, 15235.069354855554, 15079.737905223055, 14723.4126097986, 14246.831370202202, 13703.066712278314, 13126.889863721033, 12540.975003838412, 11959.963162994001, 11393.13024990841, 10846.152588382978, 10322.286580460428, 9823.164337642595, 9349.33461186759, 8900.632782122215, 8476.434844261974, 8075.831939677613, 7697.75003047397],
    "Bio Block": [0, 901.110267234373, 67.01671989895597, 435.06267582010094, 1463.01901687332, 2780.33802569648, 3970.4164977698006, 4867.248024230369, 5465.425885850802, 5816.666795510799, 5981.023714923701, 6010.4392085805, 5945.474567145801, 5816.404030099797, 5645.320204544703, 5448.1396694138975, 5236.2255011613, 5017.619742276295, 4797.954203865899, 4581.115578112005, 4369.728963681993, 4165.509074511207, 3969.515538167002, 3782.3387267813046, 3604.2352011865974, 3435.226519564992],
    "Harv Belt": [0, 660.317722880597, 4435.459987904883, 13053.774202707722, 17680.035472630298, 18752.6118203131, 18198.349612554197, 17043.7848495625, 15727.244646452704, -46330.2130675166, 15480.554683475304, 15449.357350822196, 15053.401911057093, 14533.506580725998, 13933.801653632003, -51931.895555826995, 13459.406761163094, 13974.271756070906, 14034.156959371003, 13883.814039864987, 13577.638351468011, -54805.1620655516, 13243.903183144595, 13913.467780040008, 14087.081009766991, -33731.606796162]
  },
  carbonProfileAvg: {
    "Carb Block": 7.426040938806039,
    "Carb Belt": 10.396457314328455,
    "Bio Block": 4.1429029741160806,
    "Harv Belt": 4.135082514022041
  },
  biomassProfiles: {
    "Carb Block": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "Carb Belt": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "Bio Block": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    "Harv Belt": [0, 0, 0, 0, 0, 0, 0, 0, 42.340678840469536, 0, 0, 0, 0, 0, 44.528032989706304, 0, 0, 0, 0, 0, 46.23291904894046, 0, 0, 0, 0, 42.59256727661723]
  },
  biomassProfileAvg: {
    "Carb Block": 0, "Carb Belt": 0, "Bio Block": 0, "Harv Belt": 7.027767926229342
  }
};

const form = document.querySelector("#calculator-form");
const validationEl = document.querySelector("#validation-message");
const tableBody = document.querySelector("#results-body");
const totalEl = document.querySelector("#total-impact");
const rechargeEl = document.querySelector("#recharge-reduction");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 }).format(value);
}

function formatNumber(value, digits = 3) {
  return Number(value).toLocaleString("en-AU", { minimumFractionDigits: 0, maximumFractionDigits: digits });
}

function crf(rate, years) {
  return rate === 0 ? 1 / Math.max(1, years) : rate / (1 - (1 + rate) ** (-years));
}

function parseInputs() {
  const data = new FormData(form);
  const read = (k) => data.get(k);
  const toNum = (k) => Number(read(k));

  return {
    location: read("location"),
    focus: read("focus"),
    soil: read("soil"),
    area: toNum("area"),
    carbonPriceScenario: read("carbonPriceScenario"),
    biodiversityPriceScenario: read("biodiversityPriceScenario"),
    biomassPriceScenario: read("biomassPriceScenario"),
    includeShelter: read("includeShelter") === "on",
    includeCarbon: read("includeCarbon") === "on",
    includeBiodiversity: read("includeBiodiversity") === "on",
    includeBiomass: read("includeBiomass") === "on",
    includeMicroclimate: read("includeMicroclimate") === "on",
    includeErosion: read("includeErosion") === "on",
    includeSalinity: read("includeSalinity") === "on",
    salinityRate: toNum("salinityRate"),
    costRippingMounding: toNum("costRippingMounding"),
    costInitialWeed: toNum("costInitialWeed"),
    costFertBaseInit: toNum("costFertBaseInit"),
    costFertExtraInitHarvest: toNum("costFertExtraInitHarvest"),
    costSeedlings: toNum("costSeedlings"),
    costMortality: toNum("costMortality") / 100,
    plantingRate: toNum("plantingRate"),
    costPlantingEquipPerDay: toNum("costPlantingEquipPerDay"),
    costPlantingLabourPerDay: toNum("costPlantingLabourPerDay"),
    costYear1Weed: toNum("costYear1Weed"),
    costYear1FertBase: toNum("costYear1FertBase"),
    costYear1FertExtraHarvest: toNum("costYear1FertExtraHarvest"),
    costOngoingWeed: toNum("costOngoingWeed"),
    costOngoingFertBase: toNum("costOngoingFertBase"),
    costOngoingFertExtraHarvest: toNum("costOngoingFertExtraHarvest"),
    costSequestrationSetupFarm: toNum("costSequestrationSetupFarm"),
    costSequestrationAnnualHa: toNum("costSequestrationAnnualHa"),
    costBiodiversitySetupFarm: toNum("costBiodiversitySetupFarm"),
    costBiodiversityAnnualHa: toNum("costBiodiversityAnnualHa"),
    costHarvestContractHr: toNum("costHarvestContractHr"),
    harvestRateTHr: toNum("harvestRateTHr"),
    costTransportPerTKm: toNum("costTransportPerTKm"),
    transportDistanceKm: toNum("transportDistanceKm"),
    carbonYieldCarbBlock: toNum("carbonYieldCarbBlock"),
    carbonYieldCarbBelt: toNum("carbonYieldCarbBelt"),
    carbonYieldBioBlock: toNum("carbonYieldBioBlock"),
    carbonYieldHarvBelt: toNum("carbonYieldHarvBelt"),
    carbonPriceBase: toNum("carbonPriceBase"),
    biodiversityValueCarbBlock: toNum("biodiversityValueCarbBlock"),
    biodiversityValueCarbBelt: toNum("biodiversityValueCarbBelt"),
    biodiversityValueBioBlock: toNum("biodiversityValueBioBlock"),
    biodiversityValueHarvBelt: toNum("biodiversityValueHarvBelt"),
    biomassYieldCarbBlock: toNum("biomassYieldCarbBlock"),
    biomassYieldCarbBelt: toNum("biomassYieldCarbBelt"),
    biomassYieldBioBlock: toNum("biomassYieldBioBlock"),
    biomassYieldHarvBelt: toNum("biomassYieldHarvBelt"),
    biomassPriceBase: toNum("biomassPriceBase"),
    microIncreaseCentral: toNum("microIncreaseCentral") / 100,
    microIncreaseEastern: toNum("microIncreaseEastern") / 100
  };
}

function lookupLand(inputs) {
  return TABLES.land.find((x) => x[0] === inputs.location && x[1] === inputs.soil && x[2] === inputs.area)?.[3] ?? 0;
}

function lookupShelter(inputs) {
  return TABLES.shelter.find((x) => x[0] === inputs.location && x[1] === inputs.focus && x[2] === inputs.soil && x[3] === inputs.area)?.[4] ?? 0;
}

function lookupAdjacent(inputs) {
  return TABLES.adjacent.find((x) => x[0] === inputs.location && x[1] === inputs.focus && x[2] === inputs.soil)?.[3] ?? 0;
}

function lookupErosion(inputs) {
  return TABLES.erosion.find((x) => x[0] === inputs.location && x[1] === inputs.focus)?.[2] ?? 0;
}

function lookupMicro(inputs) {
  const base = TABLES.micro.find((x) => x[0] === inputs.location)?.[1] ?? 0;
  const scalar = inputs.location === "Central wheatbelt"
    ? inputs.microIncreaseCentral / DEFAULTS.microIncreaseCentral
    : inputs.microIncreaseEastern / DEFAULTS.microIncreaseEastern;
  return base * scalar;
}

function lookupSalinity(inputs) {
  const cost = TABLES.salinity.find((x) => x[0] === inputs.location)?.[1] ?? 0;
  const rateScalar = inputs.salinityRate / DEFAULTS.salinityRate;
  return (-cost * rateScalar) / inputs.area;
}

function lookupRecharge(inputs) {
  return TABLES.controlRecharge.find((x) => x[0] === inputs.location)?.[1] ?? 0;
}

function carbonPrice(inputs) {
  if (inputs.carbonPriceScenario === "Low (-50%)") return inputs.carbonPriceBase * 0.5;
  if (inputs.carbonPriceScenario === "High (+50%)") return inputs.carbonPriceBase * 1.5;
  return inputs.carbonPriceBase;
}

function multiplierChoice(choice) {
  if (choice === "Low -50%") return 0.5;
  if (choice === "High +50%" || choice === "Low +50%") return 1.5;
  return 1;
}

function scenarioYield(inputs, mode, focus) {
  if (mode === "carbon") {
    return {
      "Carb Block": inputs.carbonYieldCarbBlock,
      "Carb Belt": inputs.carbonYieldCarbBelt,
      "Bio Block": inputs.carbonYieldBioBlock,
      "Harv Belt": inputs.carbonYieldHarvBelt
    }[focus];
  }
  return {
    "Carb Block": inputs.biomassYieldCarbBlock,
    "Carb Belt": inputs.biomassYieldCarbBelt,
    "Bio Block": inputs.biomassYieldBioBlock,
    "Harv Belt": inputs.biomassYieldHarvBelt
  }[focus];
}

function calcTrees(inputs) {
  const density = TABLES.density[inputs.focus];
  const plantingDensity = density.trees + density.shrubs;
  const isHarv = inputs.focus === "Harv Belt";
  const r = 0.05;
  const years = 25;

  const b14 = inputs.costRippingMounding + inputs.costInitialWeed + inputs.costFertBaseInit
    + (isHarv ? inputs.costFertExtraInitHarvest : 0)
    + (plantingDensity / (1 - inputs.costMortality)) * inputs.costSeedlings
    + (inputs.costPlantingEquipPerDay + inputs.costPlantingLabourPerDay) * ((plantingDensity / (1 - inputs.costMortality)) / inputs.plantingRate);
  const b15 = inputs.costYear1Weed + inputs.costYear1FertBase + (isHarv ? inputs.costYear1FertExtraHarvest : 0);
  const b16 = inputs.costOngoingWeed + inputs.costOngoingFertBase + (isHarv ? inputs.costOngoingFertExtraHarvest : 0);

  let npv = b14 + (b15 / (1 + r));
  for (let yr = 2; yr <= years - 1; yr += 1) {
    npv += b16 / ((1 + r) ** yr);
  }
  return -(npv * crf(r, years));
}

function calcCarbon(inputs) {
  if (!inputs.includeCarbon) return 0;
  const focus = inputs.focus;
  const profile = TABLES.carbonProfiles[focus];
  const avg = TABLES.carbonProfileAvg[focus];
  const yieldValue = scenarioYield(inputs, "carbon", focus);
  const regional = inputs.location === "Central wheatbelt" ? 1 : 0.64;
  const lmu = inputs.soil === "Good" ? 1 : (inputs.location === "Central wheatbelt" ? 0.7 : 0.845);
  const risk = 0.05;
  const fuelFactor = 2.7 + 0.002123 + 0.01351;
  const price = carbonPrice(inputs);
  const annualMonitoringCost = inputs.costSequestrationAnnualHa;
  const setupCost = inputs.costSequestrationSetupFarm / Math.max(1, inputs.area);
  const discount = 0.05;

  let pv = 0;
  for (let year = 0; year <= 25; year += 1) {
    const baseSeq = profile[year] * (avg === 0 ? 0 : yieldValue / avg);
    const adjustedSeq = baseSeq * (1 - risk) * regional * lmu;
    const fuelUse = year === 0 ? 40 : year === 1 ? 8 : 0;
    const fuelCo2 = fuelUse * fuelFactor;
    const income = ((adjustedSeq - fuelCo2) / 1000) * price;
    const variableCost = year >= 1 ? annualMonitoringCost : 0;
    const fixedCost = year === 0 ? setupCost : 0;
    const net = income - variableCost - fixedCost;
    pv += net / ((1 + discount) ** year);
  }
  return pv * crf(discount, 25);
}

function calcBiodiversity(inputs) {
  if (!inputs.includeBiodiversity) return 0;
  const value = {
    "Carb Block": inputs.biodiversityValueCarbBlock,
    "Carb Belt": inputs.biodiversityValueCarbBelt,
    "Bio Block": inputs.biodiversityValueBioBlock,
    "Harv Belt": inputs.biodiversityValueHarvBelt
  }[inputs.focus];
  const rate = 0.05;
  const years = 25;
  const adjustedValue = value * multiplierChoice(inputs.biodiversityPriceScenario);
  const annualIncome = adjustedValue * crf(rate, years);
  const annualVar = inputs.costBiodiversityAnnualHa;
  const annualFixed = (inputs.costBiodiversitySetupFarm / Math.max(1, inputs.area)) * crf(rate, years);
  return annualIncome - annualVar - annualFixed;
}

function calcBiomass(inputs) {
  if (!inputs.includeBiomass) return 0;
  const focus = inputs.focus;
  const profile = TABLES.biomassProfiles[focus];
  const avg = TABLES.biomassProfileAvg[focus];
  const yieldValue = scenarioYield(inputs, "biomass", focus);
  const regional = inputs.location === "Central wheatbelt" ? 1 : 0.64;
  const lmu = inputs.soil === "Good" ? 1 : (inputs.location === "Central wheatbelt" ? 0.39 : 0.69);
  const price = inputs.biomassPriceBase * multiplierChoice(inputs.biomassPriceScenario);
  const costPerTonne = (inputs.costHarvestContractHr / inputs.harvestRateTHr) + (inputs.costTransportPerTKm * inputs.transportDistanceKm);
  const discount = 0.05;

  let npvIncome = 0;
  let npvCost = 0;
  for (let year = 0; year <= 25; year += 1) {
    const base = profile[year] * (avg === 0 ? 0 : yieldValue / avg);
    const adjusted = base * regional * lmu;
    const income = adjusted * price;
    const cost = adjusted * costPerTonne;
    const df = 1 / ((1 + discount) ** year);
    npvIncome += income * df;
    npvCost += cost * df;
  }
  const annual = crf(discount, 25);
  return (npvIncome * annual) - (npvCost * annual);
}

function compute(inputs) {
  const landOpportunity = lookupLand(inputs);
  const trees = calcTrees(inputs);
  const shelter = inputs.includeShelter ? lookupShelter(inputs) : 0;
  const adjacent = lookupAdjacent(inputs);
  const carbon = calcCarbon(inputs);
  const biodiversity = calcBiodiversity(inputs);
  const biomass = calcBiomass(inputs);
  const microclimate = inputs.includeMicroclimate ? lookupMicro(inputs) : 0;
  const erosion = inputs.includeErosion ? lookupErosion(inputs) : 0;
  const salinity = inputs.includeSalinity ? lookupSalinity(inputs) : 0;
  const recharge = lookupRecharge(inputs);

  const rows = [
    ["Land opportunity cost", landOpportunity],
    ["+trees", trees],
    ["+livestock shelter", shelter],
    ["+adj pad interaction", adjacent],
    ["+carbon", carbon],
    ["+biodiversity", biodiversity],
    ["+harvesting", biomass],
    ["+micro-climate", microclimate],
    ["+increased grazing", erosion],
    ["+reduced salinity spread", salinity]
  ];

  const total = rows.reduce((sum, row) => sum + row[1], 0);
  return { total, recharge, rows };
}

function validate(inputs) {
  if (!LOCATIONS.includes(inputs.location)) return "Invalid location.";
  if (!FOCUS_OPTIONS.includes(inputs.focus)) return "Invalid planting focus.";
  if (!SOIL_OPTIONS.includes(inputs.soil)) return "Invalid soil option.";
  if (!AREA_OPTIONS.includes(inputs.area)) return "Planting area must be one of 1, 10 or 100 ha.";
  if (Object.values(inputs).some((v) => typeof v === "number" && Number.isNaN(v))) return "Please enter valid numbers.";
  if (inputs.costMortality >= 1) return "Mortality must be below 100% (for example 10 = 10%).";
  if (inputs.harvestRateTHr <= 0 || inputs.plantingRate <= 0) return "Rates must be greater than zero.";
  return "";
}

function persist(inputs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inputs));
}

function toDisplayValue(key, value) {
  if ((key === "biodiversityPriceScenario" || key === "biomassPriceScenario") && value === "Low +50%") {
    return "High +50%";
  }
  if (PERCENT_FIELDS.has(key) && Number.isFinite(Number(value))) {
    return Number(value) * 100;
  }
  if (ONE_DECIMAL_FIELDS.has(key) && Number.isFinite(Number(value))) {
    return Number(value).toFixed(1);
  }
  return value;
}

function loadInputs() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const merged = raw ? { ...DEFAULTS, ...JSON.parse(raw) } : DEFAULTS;
  for (const [key, value] of Object.entries(merged)) {
    const el = form.elements[key];
    if (!el) continue;
    if (el.type === "checkbox") el.checked = Boolean(value);
    else el.value = toDisplayValue(key, value);
  }
}

function render(result) {
  totalEl.textContent = formatCurrency(result.total);
  rechargeEl.textContent = `${formatNumber(result.recharge, 3)} mm`;
  tableBody.innerHTML = "";
  result.rows.forEach(([label, value]) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${label}</td><td>${formatCurrency(value)}</td>`;
    tableBody.appendChild(tr);
  });
}

function recalc() {
  const inputs = parseInputs();
  const error = validate(inputs);
  validationEl.textContent = error;
  if (error) return;
  persist(inputs);
  render(compute(inputs));
}

document.querySelector("#reset-btn").addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  for (const [key, value] of Object.entries(DEFAULTS)) {
    const el = form.elements[key];
    if (!el) continue;
    if (el.type === "checkbox") el.checked = Boolean(value);
    else el.value = toDisplayValue(key, value);
  }
  recalc();
});

document.querySelector("#print-btn").addEventListener("click", () => window.print());
form.addEventListener("input", recalc);
form.addEventListener("change", (event) => {
  const target = event.target;
  if (!target || !target.name || !ONE_DECIMAL_FIELDS.has(target.name)) return;
  const numeric = Number(target.value);
  if (Number.isFinite(numeric)) target.value = numeric.toFixed(1);
  recalc();
});

loadInputs();
recalc();
