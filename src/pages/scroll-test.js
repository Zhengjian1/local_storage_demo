import React from 'react';
import PullUp from "../components/pullUp";

function ScrollTest() {
    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems:"center"
        }}>
            <PullUp />
        </div>
    );
}

export default ScrollTest;
