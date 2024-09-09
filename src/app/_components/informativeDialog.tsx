import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction } from "@radix-ui/react-alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@radix-ui/react-dialog";
import { AlertDialogHeader, AlertDialogFooter } from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";

interface InformativeDialogProps {
  data: string;
  open: boolean;
  onClose: () => void;
}

export function InformativeDialog({
  data,
  open,
  onClose,
}: InformativeDialogProps): React.JSX.Element {
  return (

<AlertDialog  open={open} onOpenChange={onClose} >
      <AlertDialogContent className="flex flex-col bg-slate-300 absolute left-[37%] w-[625px] h-32 items-center justify-center text-center space-y-5  border-2 border-black ">
        <AlertDialogHeader>
          <AlertDialogDescription className="text-red-600 text-xl">
            {data}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="bg-blue-700 hover:bg-blue-500 rounded-md py-2 px-3 flex self-end">Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
