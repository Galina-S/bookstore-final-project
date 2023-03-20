import { useState } from 'react';
import { Corousel } from '../../components/Corousel';
import { NewReleases } from '../../components/NewReleases'


export const PageHome = () => {


        return (
            <div className = "pageHome">
                <div className="container1">
                    <Corousel/>                  
                </div>
                <div className="container2">
                    <NewReleases/>
                </div>


             
            </div>
        )
    }