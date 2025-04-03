import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/core/components/ui/dialog";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";
import { createTemplate } from "@/modules/templates/service";

interface Field {
  label: string;
  type: string;
  required: boolean;
}

interface CreateTemplateDialogProps {
  onTemplateCreated?: (newTemplateData: any) => void; // Prop para recargar datos
}

function CreateTemplateDialog({ onTemplateCreated }: CreateTemplateDialogProps) {
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState<Field[]>([{ label: "", type: "", required: false }]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddField = () => {
    setFields([...fields, { label: "", type: "", required: false }]);
  };

  const handleFieldChange = <T extends keyof Field>(index: number, key: T, value: Field[T]) => {
    const updatedFields = [...fields];
    updatedFields[index][key] = value;
    setFields(updatedFields);
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    try {
      const data = await createTemplate(templateName, fields);
      setSuccessMessage("Plantilla creada correctamente.");
      setTemplateName("");
      setFields([{ label: "", type: "", required: false }]);

      // Llamar a la función de recarga si se proporciona
      if (onTemplateCreated) {
        onTemplateCreated(data);
      }
    } catch (error: any) {
      setErrorMessage(error.message);
      console.error("Error al crear la plantilla:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <IconPlus className="mr-2 h-4 w-4" />
          <span className="hidden lg:inline">Añadir plantilla</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Crear Plantilla</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Define la estructura de tu nueva plantilla aquí.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="templateName" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Nombre de la Plantilla
            </Label>
            <Input
              id="templateName"
              placeholder="Nombre de tu plantilla"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
            />
          </div>
          {fields.map((field, index) => (
            <div key={index} className="grid gap-2 border rounded-md p-4">
              <Label htmlFor={`fieldLabel-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Campo {index + 1}
              </Label>
              <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-3 items-center">
                <div>
                  <Label htmlFor={`fieldLabel-${index}`} className="text-xs text-gray-500 dark:text-gray-400 block">
                    Etiqueta
                  </Label>
                  <Input
                    id={`fieldLabel-${index}`}
                    placeholder="Etiqueta del campo"
                    value={field.label}
                    onChange={(e) => handleFieldChange(index, "label", e.target.value)}
                    className="rounded-md border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor={`fieldType-${index}`} className="text-xs text-gray-500 dark:text-gray-400 block">
                    Tipo
                  </Label>
                  <Select
                    value={field.type}
                    onValueChange={(value) => handleFieldChange(index, "type", value)}
                  >
                    <SelectTrigger className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-left text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-50">
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem value="text">Texto</SelectItem>
                      <SelectItem value="textarea">Área de texto</SelectItem>
                      <SelectItem value="number">Número</SelectItem>
                      <SelectItem value="date">Fecha</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="checkbox"
                    id={`required-${index}`}
                    checked={field.required}
                    onChange={(e) => handleFieldChange(index, "required", e.target.checked)}
                    className="size-4 rounded border-gray-200 text-primary focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus-visible:ring-primary"
                  />
                  <Label htmlFor={`required-${index}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Requerido
                  </Label>
                </div>
              </div>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={handleAddField} className="mt-2">
            Añadir Campo
          </Button>
          {errorMessage && <p className="text-red-600 text-sm">{errorMessage}</p>}
          {successMessage && <p className="text-green-600 text-sm">{successMessage}</p>}
          <DialogFooter>
            <Button type="submit">Crear Plantilla</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateTemplateDialog;