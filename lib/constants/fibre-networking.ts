import axios from 'axios';
import { FibreCable } from '@/types/fibre-cable';
import { FibrePatchPanel } from '@/types/fibre-patch-panel';
import { FibrePatchPanelCassette } from '@/types/fibre-patch-panel-cassette';
import { FibreBreakoutBox } from '@/types/fibre-breakout-box';
import { FibrePatchBox } from '@/types/fibre-patch-box';
import { FibreConnectorCoupler } from '@/types/fibre-connector-coupler';
import { FibreAttenuator } from '@/types/fibre-attenuator';
import { FibreToolsAccessoriesType } from '@/types/fibre-tools-accessories';

// API Endpoints
export const API_ENDPOINTS = {
  FIBRE_CABLES: '/api/fibre-cables',
  FIBRE_PATCH_PANELS: '/api/fibre-patch-panels',
  FIBRE_PATCH_PANEL_CASSETTES: '/api/fibre-patch-panel-cassettes',
  FIBRE_BREAKOUT_BOXES: '/api/fibre-breakout-boxes',
  FIBRE_PATCH_BOXES: '/api/fibre-patch-boxes',
  FIBRE_CONNECTORS_COUPLERS: '/api/fibre-connectors-couplers',
  FIBRE_ATTENUATORS: '/api/fibre-attenuators',
  FIBRE_TOOLS_ACCESSORIES: '/api/fibre-tools-accessories',
};

// Category Titles
export const CATEGORY_TITLES = {
  'fibre-cable': 'Fibre Cables',
  'fibre-patch-panels': 'Fibre Patch Panels',
  'fibre-patch-panel-cassettes': 'Fibre Patch Panel Cassettes',
  'fibre-breakout-boxes': 'Fibre Breakout Boxes',
  'fibre-patch-boxes': 'Fibre Patch Boxes',
  'fibre-connectors-couplers': 'Fibre Connectors & Couplers',
  'fibre-attenuators': 'Fibre Attenuators',
  'fibre-tools-accessories': 'Fibre Tools & Accessories',
};

// API Functions
export const fetchFibreCables = async (): Promise<FibreCable[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_CABLES);
  return response.data;
};

export const fetchFibrePatchPanels = async (): Promise<FibrePatchPanel[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_PATCH_PANELS);
  return response.data;
};

export const fetchFibrePatchPanelCassettes = async (): Promise<FibrePatchPanelCassette[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_PATCH_PANEL_CASSETTES);
  return response.data;
};

export const fetchFibreBreakoutBoxes = async (): Promise<FibreBreakoutBox[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_BREAKOUT_BOXES);
  return response.data;
};

export const fetchFibrePatchBoxes = async (): Promise<FibrePatchBox[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_PATCH_BOXES);
  return response.data;
};

export const fetchFibreConnectorsCouplers = async (): Promise<FibreConnectorCoupler[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_CONNECTORS_COUPLERS);
  return response.data;
};

export const fetchFibreAttenuators = async (): Promise<FibreAttenuator[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_ATTENUATORS);
  return response.data;
};

export const fetchFibreToolsAccessories = async (): Promise<FibreToolsAccessoriesType[]> => {
  const response = await axios.get(API_ENDPOINTS.FIBRE_TOOLS_ACCESSORIES);
  return response.data;
};

// Category to API function mapping
export const CATEGORY_API_MAP = {
  'fibre-cable': fetchFibreCables,
  'fibre-patch-panels': fetchFibrePatchPanels,
  'fibre-patch-panel-cassettes': fetchFibrePatchPanelCassettes,
  'fibre-breakout-boxes': fetchFibreBreakoutBoxes,
  'fibre-patch-boxes': fetchFibrePatchBoxes,
  'fibre-connectors-couplers': fetchFibreConnectorsCouplers,
  'fibre-attenuators': fetchFibreAttenuators,
  'fibre-tools-accessories': fetchFibreToolsAccessories,
}; 