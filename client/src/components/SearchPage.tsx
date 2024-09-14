import React, { useState } from "react";
import { useParams } from "react-router-dom";
import FilterPage from "./common/FilterPage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X } from "lucide-react";

const SearchPage = () => {
  const { text } = useParams();
  const [searchQuery, setSearchQuery] = useState<string>("");
  return (
    <div className="max-w-7xl mx-auto px-2 my-10">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <FilterPage />
        <div className="flex-1">
          {/* Search input field */}
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search by restaurant or cuisines"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="bg-orange hover:bg-hoverOrange">Search</Button>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1>(2) Search result found</h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {["biryani", "momos", "chowmin"].map((item, index) => (
                  <div
                    key={index}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                      variant="outline"
                    >
                      {item}
                    </Badge>
                    <X
                      size={16}
                      className=" absolute right-1 text-[#D19254] cursor-pointer "
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
