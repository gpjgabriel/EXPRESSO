'use client';

import React from 'react';
import { StyleSheetManager, ServerStyleSheet } from 'styled-components';


export default function StyledComponentsRegistry({ children }) {
  if (typeof window === 'undefined') {
    const sheet = new ServerStyleSheet();
    try {
      return (
        <StyleSheetManager sheet={sheet.instance}>
          {children}
        </StyleSheetManager>
      );
    } finally {
      sheet.seal();
    }
  }
  return <>{children}</>;
}