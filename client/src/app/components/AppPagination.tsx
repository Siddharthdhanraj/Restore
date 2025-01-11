import { Typography, Pagination } from "@mui/material";
import { Box } from "@mui/system";
import { Metadata } from "../models/pagination";

interface Props{
    metadata:Metadata;
    OnPageChange:(page:number)=>void;
}
export default function AppPagination({metadata,OnPageChange}:Props)
{
    const {currentPage,totalCount,totalPages,pageSize}=metadata
    return(
        <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography>
          Display {(currentPage-1)*pageSize+1}-{currentPage*pageSize>totalCount
          ?totalCount
          :(currentPage*pageSize)} of {totalCount} items
        </Typography>
        <Pagination 
         color='secondary' 
         size='large' 
         count={totalPages} 
         page={currentPage}
         onChange={(e,page)=>OnPageChange(page)}
         />
        </Box>

    )

}