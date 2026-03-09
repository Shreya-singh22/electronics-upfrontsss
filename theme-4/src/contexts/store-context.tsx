import { createContext, useContext, ReactNode } from 'react';
import { useStoreCustomization } from '../lib/api';

const CustomizationContext = createContext<any>(undefined);

export function CustomizationProvider({ children }: { children: ReactNode }) {
    const storeData = useStoreCustomization();
    return (
        <CustomizationContext.Provider value={storeData}>
            {children}
        </CustomizationContext.Provider>
    );
}

export function useCustomizationContext() {
    const context = useContext(CustomizationContext);
    if (context === undefined) throw new Error('useCustomizationContext must be used within a CustomizationProvider');
    return context;
}
