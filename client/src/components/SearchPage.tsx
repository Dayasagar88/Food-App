import  { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import FilterPage from "./common/FilterPage";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Globe, MapPin, X } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { AspectRatio } from "./ui/aspect-ratio";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Restaurant } from "@/types/restaurantType";

const SearchPage = () => {
  const { text } = useParams();
  const {
    searchedRestaurant,
    searchRestaurant,
    appliedFilter,
    setAppliedFilter,
  } = useRestaurantStore();
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    searchRestaurant(text!, searchQuery, appliedFilter);
  }, [text!, appliedFilter]);
  const loading = false;

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-2 my-10">
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
              className="focus-visible:ring-transparent"
            />
            <Button
              onClick={() =>
                searchRestaurant(text!, searchQuery, appliedFilter)
              }
              className="bg-orange hover:bg-hoverOrange"
            >
              Search
            </Button>
          </div>
          <div>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-2 my-3">
              <h1 className="font-medium text-lg">
                ({searchedRestaurant?.data?.length}) Search result found
              </h1>
              <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                {appliedFilter.map((item: any) => (
                  <div
                    key={item}
                    className="relative inline-flex items-center max-w-full"
                  >
                    <Badge
                      className="text-[#D19254] rounded-md hover:cursor-pointer pr-6 whitespace-nowrap"
                      variant="outline"
                    >
                      {item}
                    </Badge>
                    <X
                      onClick={() => setAppliedFilter(item)}
                      size={16}
                      className=" absolute right-1 text-[#D19254] cursor-pointer "
                    />
                  </div>
                ))}
              </div>
            </div>
            {/* Restaurant card */}
            <div>
              {loading ? (
                <SearchPageSkeleton />
              ) : !loading && searchedRestaurant?.data.length === 0 ? (
                <NoResultFound searchText={text!} />
              ) : (
                searchedRestaurant?.data?.map((card: Restaurant) => (
                  <div key={card._id} className="grid w-full sm:grid-cols-3 gap-4 cursor-pointer">
                    <Card
                      key={card._id}
                      className="bg-white dark:bg-gray-800 shadow-xl rounded-xl hover:shadow-2xl transition-shadow overflow-hidden duration-300"
                    >
                      <div className="relative h-[40%]">
                        <div className=" h-[50%] w-full">
                          <img
                            src={card.imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className=" absolute top-2  bg-white dark:bg-gray-700 bg-opacity-75 rounded-lg py-1 px-3">
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Featured
                          </span>
                        </div>
                      </div>

                      <CardContent className="pt-4 space-y-2">
                        <h1 className="text-2xl text-gray-900 font-bold dark:text-gray-100">
                          {card.restaurantName}
                        </h1>
                        <div className="mt-2 gap-2 flex items-center text-gray-600 dark:text-gray-400">
                          <MapPin />
                          <p className="text-sm">
                            City :{" "}
                            <span className="font-medium">{card.city}</span>
                          </p>
                        </div>
                        <div className="mt-2 gap-2 flex items-center text-gray-600 dark:text-gray-400">
                          <Globe />
                          <p className="text-sm">
                            Country :{" "}
                            <span className="font-medium">{card.country}</span>
                          </p>
                        </div>
                        <div className="flex  gap-2 flex-wrap">
                          {card?.cuisines?.map(
                            (cuisine: string, index: number) => (
                              <Badge
                                className="font-medium rounded-full shadow-sm px-2 pb-1"
                                key={index}
                              >
                                {cuisine}
                              </Badge>
                            )
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 border-t dark:border-gray-700 border-t-gray-100 text-white flex justify-end">
                        <Link to={`/restaurant/${card._id}`}>
                          <Button className="bg-orange hover:bg-hoverOrange font-semibold rounded-full shadow-md transition-colors duration-200">
                            View menu
                          </Button>
                        </Link>
                      </CardFooter>
                    </Card>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const SearchPageSkeleton = () => {
  return (
    <>
      <div className="grid md:grid-cols-3 gap-3 w-full">
        {[1, 2, 3, 4, 5, 6].map((index: number) => (
          <Card
            key={index}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-xl hover:shadow-2xl transition-shadow overflow-hidden duration-300"
          >
            <div className="relative animate-pulse">
              <AspectRatio>
                <div className="w-full h-full bg-gray-300 dark:bg-gray-700"></div>
              </AspectRatio>
              <div className=" absolute top-2 bg-gray-200 dark:bg-gray-600 bg-opacity-75 rounded-lg py-1 px-3">
                <div className="h-4 w-16 bg-gray-300 dark:bg-gray-600"></div>
              </div>
            </div>

            <CardContent className="pt-4 space-y-2 animate-pulse">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 w-3/4"></div>

              <div className="mt-2 gap-2 flex items-center">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/2"></div>
              </div>

              <div className="mt-2 gap-2 flex items-center">
                <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 w-1/2"></div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="h-6 w-12 bg-gray-300 dark:bg-gray-600 rounded-full"
                  ></div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="p-4 border-t dark:border-gray-700 border-t-gray-100 text-white flex justify-end animate-pulse">
              <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

const NoResultFound = ({ searchText }: { searchText: string }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
        No results found
      </h1>
      <p className="mt-2 text-gray-500 dark:text-gray-400">
        We couldn't find any results for "{searchText}". <br /> Try searching
        with a different term.
      </p>
      <Link to="/">
        <Button className="mt-4 bg-orange hover:bg-orangeHover">
          Go Back to Home
        </Button>
      </Link>
    </div>
  );
};
