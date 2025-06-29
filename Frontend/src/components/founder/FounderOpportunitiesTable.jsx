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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Badge } from "../ui/badge";

const FounderOpportunitiesTable = () => {
  const { allFounderOpportunities, searchOpportunityByText } = useSelector(
    (store) => store.opportunity
  );
  const navigate = useNavigate();
  const [filterOpportunities, setFilterOpportunities] = useState(allFounderOpportunities);

  useEffect(() => {
    const filteredOpportunities =
      allFounderOpportunities.length >= 0 &&
      allFounderOpportunities.filter((opportunity) => {
        if (!searchOpportunityByText) {
          return true;
        }
        return (
          opportunity.title?.toLowerCase().includes(searchOpportunityByText.toLowerCase()) ||
          opportunity?.startup?.name
            .toLowerCase()
            .includes(searchOpportunityByText.toLowerCase())
        );
      });
    setFilterOpportunities(filteredOpportunities);
  }, [allFounderOpportunities, searchOpportunityByText]);

  if (!allFounderOpportunities) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Table>
        <TableCaption>Your posted opportunities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Startup Name</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterOpportunities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No opportunities posted
              </TableCell>
            </TableRow>
          ) : (
            filterOpportunities?.map((opportunity) => (
              <TableRow key={opportunity._id}>
                <TableCell>{opportunity?.startup?.name}</TableCell>
                <TableCell>{opportunity.title}</TableCell>
                <TableCell>{opportunity.opportunityType}</TableCell>
                <TableCell>
                  <Badge 
                    variant={opportunity.status === 'Active' ? 'default' : 'secondary'}
                  >
                    {opportunity.status}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(opportunity.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        onClick={() => navigate(`/opportunity/${opportunity._id}`)}
                        className="flex items-center gap-2 w-fit cursor-pointer mb-1"
                      >
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                      <hr />
                      <div 
                        onClick={() => navigate(`/founder/opportunities/${opportunity._id}/applicants`)} 
                        className="flex items-center gap-2 w-fit cursor-pointer mt-1"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
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

export default FounderOpportunitiesTable;