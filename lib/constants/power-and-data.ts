import axios from 'axios';
import { PowerPdu } from '@/types/power-pdu';
import { PowerCord } from '@/types/power-cords';
import { MpoFibreAssembly } from '@/types/mpo-fibre-assemblies';
import { MpoCassette } from '@/types/mpo-cassettes';
import { MpoChassis } from '@/types/mpo-chassis';
import { FibreDuct } from '@/types/fibre-duct';
import { DataCentreRack } from '@/types/data-centre-racks';
import { LiquidCooling } from '@/types/liquid-cooling';

// API Endpoints
export const API_ENDPOINTS = {
    POWER_PDUS: '/api/power-pdus',
    POWER_CORDS: '/api/power-cords-extension-leads',
    MPO_FIBRE_ASSEMBLIES: '/api/mpo-fibre-assemblies',
    MPO_CASSETTES: '/api/mpo-cassettes',
    MPO_CHASSIS: '/api/mpo-chassis',
    FIBRE_DUCT: '/api/fibre-duct',
    DATA_CENTRE_RACKS: '/api/data-centre-racks',
    KEYSTONE_JACKS: '/api/keystone-jacks',
    LIQUID_COOLING: '/api/liquid-cooling',
};

// Category Titles
export const CATEGORY_TITLES = {
    'power-pdus': 'Power PDUs',
    'power-cords-extension-leads': 'Power Cords & Extension Leads',
    'mpo-fibre-assemblies': 'MPO Fibre Assemblies',
    'mpo-cassettes': 'MPO Cassettes',
    'mpo-chassis': 'MPO Chassis',
    'fibre-duct': 'Fibre Duct',
    'data-centre-racks': 'Data Centre Racks',
    'aisle-containment': 'Aisle Containment',
    'liquid-cooling': 'Liquid Cooling',
    'intelligent-power': 'Intelligent Power',
} as const;

// API Functions
export const fetchPowerPdus = async (): Promise<PowerPdu[]> => {
    const response = await axios.get(API_ENDPOINTS.POWER_PDUS);
    return response.data;
};

export const fetchPowerCords = async (): Promise<PowerCord[]> => {
    const response = await axios.get(API_ENDPOINTS.POWER_CORDS);
    return response.data;
};

export const fetchMpoFibreAssemblies = async (): Promise<MpoFibreAssembly[]> => {
    const response = await axios.get(API_ENDPOINTS.MPO_FIBRE_ASSEMBLIES);
    return response.data;
};

export const fetchMpoCassettes = async (): Promise<MpoCassette[]> => {
    const response = await axios.get(API_ENDPOINTS.MPO_CASSETTES);
    return response.data;
};

export const fetchMpoChassis = async (): Promise<MpoChassis[]> => {
    const response = await axios.get(API_ENDPOINTS.MPO_CHASSIS);
    return response.data;
};

export const fetchFibreDuct = async (): Promise<FibreDuct[]> => {
    const response = await axios.get(API_ENDPOINTS.FIBRE_DUCT);
    return response.data;
};

export const fetchDataCentreRacks = async (): Promise<DataCentreRack[]> => {
    const response = await axios.get(API_ENDPOINTS.DATA_CENTRE_RACKS);
    return response.data;
};



export const fetchLiquidCooling = async (): Promise<LiquidCooling[]> => {
    const response = await axios.get(API_ENDPOINTS.LIQUID_COOLING);
    return response.data;
};

// Category to API function mapping
export const CATEGORY_API_MAP = {
    'power-pdus': fetchPowerPdus,
    'power-cords-extension-leads': fetchPowerCords,
    'mpo-fibre-assemblies': fetchMpoFibreAssemblies,
    'mpo-cassettes': fetchMpoCassettes,
    'mpo-chassis': fetchMpoChassis,
    'fibre-duct': fetchFibreDuct,
    'data-centre-racks': fetchDataCentreRacks,
    'liquid-cooling': fetchLiquidCooling,
} as const; 