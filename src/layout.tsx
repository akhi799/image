import {Grid} from '@aws-amplify/ui-react'
import React from 'react'
export function Layout({children}:{children?:React.ReactNode}){
    return (
        <Grid
        gap="lrem"
        templateRows="auto 1fr"
        height="100%"
        justifyContent="center"
        >
            {children}
        </Grid>
    )    
}