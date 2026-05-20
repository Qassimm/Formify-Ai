import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Theme from "@/app/_data/Theme";
import BackgroundG from "@/app/_data/BackgroundG";
import { Button } from "@/components/ui/button";

const Controller = ({selectedTheme, selectedBackground}) => {

    const [showMore, SetShowMore] = useState(6);

  return (
    <div>
      <h2>Select Theme</h2>

      <Select onValueChange = {(value)=> selectedTheme(value)}>
        <SelectTrigger className="w-full max-h-20">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {Theme.map((theme, index) => (
              <SelectItem value={theme.theme} key={index}>
                <div className="flex gap-2">
                  <div className="flex">
                    <div
                      className="h-5 w-5 rounded-l-md"
                      style={{ backgroundColor: theme.primary }}
                    ></div>
                    <div
                      className="h-5 w-5"
                      style={{ backgroundColor: theme.secondary }}
                    ></div>
                    <div
                      className="h-5 w-5"
                      style={{ backgroundColor: theme.accent }}
                    ></div>
                    <div
                      className="h-5 w-5 rounded-r-md"
                      style={{ backgroundColor: theme.neutral }}
                    ></div>
                  </div>
                  {theme.theme}
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <h2 className="mt-8 my-1">Background</h2>
      <div className="grid  grid-cols-3 gap-1 ">
        {BackgroundG.map((gradient, index) =>(index<showMore)&&(
            <div
            key={index}
            onClick={()=> selectedBackground(gradient.gradient)}
             className="w-full h-[50px] rounded-lg hover:border-2"
            style={{background:gradient.gradient}}>
            </div>
        ))}
      </div>
        <Button onClick={()=> SetShowMore(showMore>6?6:20)} variant="ghost" className='mt-2 w-full' size="sm">
            {showMore>6?"Show less":"Show More"}
            </Button>
    </div>
  );
};

export default Controller;
