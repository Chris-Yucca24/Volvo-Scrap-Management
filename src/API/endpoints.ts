const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const Endpoints = {

    // Scrap Part Number // 
    getScrapParts: () =>
        `${BASE_URL}/scrap-parts`,

    getScrapPartById: (id: number) =>
        `${BASE_URL}/scrap-parts/${id}`,

    createScrapPart: () =>
        `${BASE_URL}/scrap-parts`,

    updateScrapPart: (id: number) =>
        `${BASE_URL}/scrap-parts/${id}`,

    deleteScrapPart: (id: number) =>
        `${BASE_URL}/scrap-parts/${id}`,


    // KSPCB Master// 

    getKspcbList: () =>
        `${BASE_URL}/kspcb`,

    getKspcbById: (id: number) =>
        `${BASE_URL}/kspcb/${id}`,

    createKspcb: () =>
        `${BASE_URL}/kspcb`,

    updateKspcb: (id: number) =>
        `${BASE_URL}/kspcb/${id}`,

    deleteKspcb: (id: number) =>
        `${BASE_URL}/kspcb/${id}`,


    // Vendor Management
    //

    getVendors: () =>
        `${BASE_URL}/vendors`,

    getVendorById: (id: number) =>
        `${BASE_URL}/vendors/${id}`,

    createVendor: () =>
        `${BASE_URL}/vendors`,

    updateVendor: (id: number) =>
        `${BASE_URL}/vendors/${id}`,

    deleteVendor: (id: number) =>
        `${BASE_URL}/vendors/${id}`,


    // Source Management
    //

    getSources: () =>
        `${BASE_URL}/sources`,

    getSourceById: (id: number) =>
        `${BASE_URL}/sources/${id}`,

    createSource: () =>
        `${BASE_URL}/sources`,

    updateSource: (id: number) =>
        `${BASE_URL}/sources/${id}`,

    deleteSource: (id: number) =>
        `${BASE_URL}/sources/${id}`,


    // Slideshow Display
    //

    getSlideshowData: () =>
        `${BASE_URL}/slideshow`,

    createSlideshow: () =>
        `${BASE_URL}/slideshow`,

    updateSlideshow: (id: number) =>
        `${BASE_URL}/slideshow/${id}`,

    deleteSlideshow: (id: number) =>
        `${BASE_URL}/slideshow/${id}`,

};


export default Endpoints;