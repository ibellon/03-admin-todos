
'use client'

import { setCookie } from "cookies-next";
import { useState } from "react";

// https://tailwindcomponents.com/component/radio-buttons-1

export const tabOptionsInicial = [1,2,3,4,5]

interface Props {
  currentTab?: number;
  tabOptions?: number[];
}

export const TabBar = ({currentTab = 1, tabOptions = tabOptionsInicial}:Props) => {

  const [selected, setSelected] = useState(currentTab)

  const onTabSelected = (tab:number) => {
    setSelected(tab)
    setCookie('selectedTab', tab.toString())
  }

  return (
    <div className={`grid w-full ${'grid-cols-'+tabOptions.length} transition-all space-x-2 rounded-xl bg-gray-200 p-2`}>
      {
        tabOptions.map(tab => {
          return(<div key={tab}>
            <input
              checked={tab === selected}
              onChange={() => {}}
              type="radio" id={tab.toString()} className="peer hidden" />
            <label
              onClick={() => onTabSelected(tab)} 
              className="block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white">
              {tab}
            </label>
          </div>)
        })
      }   
    </div>
  )
}