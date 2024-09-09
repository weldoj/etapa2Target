"use client";
import { Button } from "~/components/ui/button";
import { api } from "~/trpc/react";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "~/components/ui/table";
import React, { useState } from "react";
import ModalCreate from "../_components/modelCreate";
import ModalEdit from "../_components/modelEdit";
import { useRouter } from "next/navigation";
import { InformativeDialog } from "../_components/informativeDialog";

interface DataWithId {
  id: number;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData extends DataWithId, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });
  console.log(rowSelection);
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [response, setResponse] = useState("");
  const { mutate } = api.task.deleteMany.useMutation({
    onSuccess: () => {
      router.refresh();
      setResponse("Task deletada com sucesso!");
      setDialogOpen(true);  

    },
    onError: () => {
      setResponse("Ocorreu um erro ao deletar a task!");
      setDialogOpen(true);  

    },
  });
  const selectedRows = table.getFilteredSelectedRowModel().rows;
  const selectedIds = selectedRows.map(row => row.original.id);

  console.log(selectedIds);
  console.log(selectedIds);
  console.log(selectedIds);
  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex-1 pt-4 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="flex items-center justify-between space-x-2 pt-16">
        <Button
         onClick={() => {
          setResponse("");
          if (selectedIds.length > 0) {
            mutate({ ids: selectedIds }); // Pass the selected IDs to deleteMany
          }
        }}
        >
          deletar linha selecionada
        </Button>
        <InformativeDialog data={response} open={dialogOpen} onClose={() => setDialogOpen(false)} />

        <ModalCreate />
        <div className="flex w-full items-center justify-end pr-6">
          <ModalEdit
            id={
              selectedRows.length > 0
                ? Number(selectedRows[0]?.original.id) || 0
                : 0
            }
          />
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
