import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const FounderStartupsTable = () => {
  const { startups, searchStartupByText } = useSelector((store) => store.startup);
  const navigate = useNavigate();
  const [filterStartups, setFilterStartups] = useState(startups);

  useEffect(() => {
    const filteredStartups =
      startups.length >= 0 &&
      startups.filter((startup) => {
        if (!searchStartupByText) {
          return true;
        }
        return startup.name
          ?.toLowerCase()
          .includes(searchStartupByText.toLowerCase());
      });
    setFilterStartups(filteredStartups);
  }, [startups, searchStartupByText]);

  if (!startups) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Your registered startups</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Startup Name</TableHead>
            <TableHead>Industry</TableHead>
            <TableHead>Stage</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterStartups.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No startups registered
              </TableCell>
            </TableRow>
          ) : (
            filterStartups?.map((startup) => (
              <TableRow key={startup._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src={startup.logo || "/default-startup-logo.png"}
                      alt={`${startup.name} logo`}
                    />
                  </Avatar>
                </TableCell>
                <TableCell>{startup.name}</TableCell>
                <TableCell>{startup.industry}</TableCell>
                <TableCell>{startup.stage}</TableCell>
                <TableCell>{new Date(startup.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/founder/startups/${startup._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default FounderStartupsTable;