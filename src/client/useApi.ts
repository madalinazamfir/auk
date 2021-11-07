import {useCallback, useEffect, useState} from 'react';

const REPORT_TYPES = {
    BEAR: 'BEAR',
    ATTACK: 'ATTACK',
};

const useApi = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [bearAlerts, setBearAlerts] = useState([]);

    const loadData = useCallback(async (): Promise<[BearAlert]> => {
        setIsLoading(true);

        const response = await fetch('/api/bear-alert');
        const data = await response.json();

        setBearAlerts(data);
        setIsLoading(false);

        return data;
    }, []);

    const saveBearAlert = useCallback(async (data: BearAlert): Promise<BearAlert> => {
        const response = await fetch('/api/bear-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        return responseData;
    }, []);

    return {isLoading, bearAlerts, saveBearAlert, loadData};
};

interface BearAlert {
    latitude: Number,
    longitude: Number,
    contact: String,
    type: String
}

export default useApi;
export {REPORT_TYPES};