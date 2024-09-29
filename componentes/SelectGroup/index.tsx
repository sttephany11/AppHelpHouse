import React from "react";
import { Body } from "./style";
import { IndexPath, Select, SelectGroup, SelectItem } from '@ui-kitten/components';



export const SelectWithGroupsShowcase = (): React.ReactElement => {

    const [selectedIndex, setSelectedIndex] = React.useState<IndexPath | IndexPath[]>(new IndexPath(0, 1));
    const [multiSelectedIndex, setMultiSelectedIndex] = React.useState<IndexPath | IndexPath[]>([
      new IndexPath(0, 0),
      new IndexPath(1, 1),
    ]);
  
    return (
      <Body>
  
        <Select
          placeholder='AAAA'
          selectedIndex={selectedIndex}
          onSelect={index => setSelectedIndex(index)}
        >
          <SelectGroup title='Construção'>
            <SelectItem title='Pedreiro' />
            <SelectItem title='Eletricistas' />
            <SelectItem title='Encanadores' />
          </SelectGroup>
          <SelectGroup title='Manutenção'>
            <SelectItem title='Técnicos em eletrodomésticos' />
            <SelectItem title='Pintura' />
            <SelectItem title='jardineiros' />
          </SelectGroup>
        </Select>
  
       
  
      </Body>
    );
  };


