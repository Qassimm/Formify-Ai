    "use client";

    import React, { use, useEffect } from 'react'

    const LiveAiForm = ({params}) => {
        
        const { id } = use(params)

        useEffect(()=>{
            console.log(id)
        }, [])

    return (
        <div>LiveAiForm</div>
    )
    }

    export default LiveAiForm