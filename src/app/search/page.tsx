"use client";

import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import TaskCard from "@/components/TaskCard";
import UserCard from "@/components/UserCard";
import { useSearchQuery } from "@/state/api";
import { debounce, set } from "lodash";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: SearchResults,
    isLoading,
    error,
  } = useSearchQuery({ query: searchTerm }, { skip: searchTerm.length < 3 });

  const handleSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    500,
  );

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header name="Search" />
      <div>
        <input
          type="text"
          placeholder="Search..."
          className="rouned w-1/2 border p-3 shadow"
          onChange={handleSearch}
        />
      </div>
      <div className="p-5">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error accurred while fetching search results</p>}
        {!isLoading && !error && SearchResults && (
          <div>
            {SearchResults.tasks && SearchResults.tasks?.length > 0 && (
              <h2>Tasks</h2>
            )}
            {SearchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {SearchResults.projects && SearchResults.projects?.length > 0 && (
              <h2>Projects</h2>
            )}
            {SearchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {SearchResults.users && SearchResults.users?.length > 0 && (
              <h2>Users</h2>
            )}
            {SearchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
