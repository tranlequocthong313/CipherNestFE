import React, { useEffect, useReducer, useState } from 'react';
import extractReducer, { initialExtractState } from '../reducers/extractReducer';
import { ExtractContext, ExtractDispatchContext } from '../contexts/ExtractContext';
import { IExtractProps } from '../interfaces/IExtract';
import HTTP, { coverFileApis } from '../configs/api';
import { useCoverFile, useCoverFileDispatch } from '../hooks/useCoverFile';
import { useSecretFile, useSecretFileDispatch } from '../hooks/useSecretFile';
import { CODES, DEBUG } from '../configs/constant';
import { v4 as uuid } from "uuid";
import axios from 'axios';

const ExtractProvider: React.FC<IExtractProps> = ({ children }) => {
    const [extract, dispatch] = useReducer(extractReducer, initialExtractState);

    return (
        <ExtractContext.Provider value={extract}>
            <ExtractDispatchContext.Provider value={dispatch}>
                {children}
            </ExtractDispatchContext.Provider>
        </ExtractContext.Provider>
    );
};

export default ExtractProvider;
