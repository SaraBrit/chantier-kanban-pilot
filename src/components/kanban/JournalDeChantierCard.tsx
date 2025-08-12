import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit } from "lucide-react";
import { JournalDeChantier } from "@/types/project";

interface JournalDeChantierCardProps {
  projectId: string;
}

export const JournalDeChantierCard = ({ projectId }: JournalDeChantierCardProps) => {
  const [journalEntries, setJournalEntries] = useState<JournalDeChantier[]>([
    {
      id: "JDC-001",
      projectId,
      designation: "Excavation terrain",
      numeroArticle: "EXC-001",
      unite: "m³",
      quantitePlanifiee: 100,
      quantiteRealisee: 80,
      dateCreation: "2024-06-01",
      responsable: "Jean Dupont"
    },
    {
      id: "JDC-002",
      projectId,
      designation: "Coulage béton fondation",
      numeroArticle: "BET-002",
      unite: "m³",
      quantitePlanifiee: 50,
      quantiteRealisee: 45,
      dateCreation: "2024-06-10",
      responsable: "Marie Martin"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<JournalDeChantier | null>(null);
  const [formData, setFormData] = useState({
    designation: "",
    numeroArticle: "",
    unite: "",
    quantitePlanifiee: "",
    quantiteRealisee: "",
    responsable: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newEntry: JournalDeChantier = {
      id: editingEntry ? editingEntry.id : `JDC-${Date.now()}`,
      projectId,
      designation: formData.designation,
      numeroArticle: formData.numeroArticle,
      unite: formData.unite,
      quantitePlanifiee: parseFloat(formData.quantitePlanifiee),
      quantiteRealisee: parseFloat(formData.quantiteRealisee),
      dateCreation: editingEntry ? editingEntry.dateCreation : new Date().toISOString().split('T')[0],
      responsable: formData.responsable
    };

    if (editingEntry) {
      setJournalEntries(prev => prev.map(entry => 
        entry.id === editingEntry.id ? newEntry : entry
      ));
    } else {
      setJournalEntries(prev => [...prev, newEntry]);
    }

    setFormData({
      designation: "",
      numeroArticle: "",
      unite: "",
      quantitePlanifiee: "",
      quantiteRealisee: "",
      responsable: ""
    });
    setEditingEntry(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (entry: JournalDeChantier) => {
    setEditingEntry(entry);
    setFormData({
      designation: entry.designation,
      numeroArticle: entry.numeroArticle,
      unite: entry.unite,
      quantitePlanifiee: entry.quantitePlanifiee.toString(),
      quantiteRealisee: entry.quantiteRealisee.toString(),
      responsable: entry.responsable
    });
    setIsDialogOpen(true);
  };

  const getProgressColor = (planifiee: number, realisee: number) => {
    const percentage = (realisee / planifiee) * 100;
    if (percentage < 50) return "text-red-600";
    if (percentage > 100) return "text-orange-600";
    return "text-green-600";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">Journal de Chantier</CardTitle>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={() => {
              setEditingEntry(null);
              setFormData({
                designation: "",
                numeroArticle: "",
                unite: "",
                quantitePlanifiee: "",
                quantiteRealisee: "",
                responsable: ""
              });
            }}>
              <Plus className="h-4 w-4 mr-1" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingEntry ? "Modifier l'entrée" : "Nouvelle entrée"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="designation">Désignation</Label>
                <Input
                  id="designation"
                  value={formData.designation}
                  onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="numeroArticle">Numéro d'article</Label>
                <Input
                  id="numeroArticle"
                  value={formData.numeroArticle}
                  onChange={(e) => setFormData(prev => ({ ...prev, numeroArticle: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="unite">Unité</Label>
                <Input
                  id="unite"
                  value={formData.unite}
                  onChange={(e) => setFormData(prev => ({ ...prev, unite: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantitePlanifiee">Quantité planifiée</Label>
                <Input
                  id="quantitePlanifiee"
                  type="number"
                  step="0.01"
                  value={formData.quantitePlanifiee}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantitePlanifiee: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="quantiteRealisee">Quantité réalisée</Label>
                <Input
                  id="quantiteRealisee"
                  type="number"
                  step="0.01"
                  value={formData.quantiteRealisee}
                  onChange={(e) => setFormData(prev => ({ ...prev, quantiteRealisee: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="responsable">Responsable</Label>
                <Input
                  id="responsable"
                  value={formData.responsable}
                  onChange={(e) => setFormData(prev => ({ ...prev, responsable: e.target.value }))}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {editingEntry ? "Modifier" : "Ajouter"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Désignation</TableHead>
                <TableHead>N° Article</TableHead>
                <TableHead>Unité</TableHead>
                <TableHead>Qté Planifiée</TableHead>
                <TableHead>Qté Réalisée</TableHead>
                <TableHead>%</TableHead>
                <TableHead>Responsable</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {journalEntries.map((entry) => {
                const percentage = ((entry.quantiteRealisee / entry.quantitePlanifiee) * 100).toFixed(1);
                return (
                  <TableRow key={entry.id}>
                    <TableCell className="font-medium">{entry.designation}</TableCell>
                    <TableCell>{entry.numeroArticle}</TableCell>
                    <TableCell>{entry.unite}</TableCell>
                    <TableCell>{entry.quantitePlanifiee}</TableCell>
                    <TableCell>{entry.quantiteRealisee}</TableCell>
                    <TableCell className={getProgressColor(entry.quantitePlanifiee, entry.quantiteRealisee)}>
                      {percentage}%
                    </TableCell>
                    <TableCell>{entry.responsable}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(entry)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};