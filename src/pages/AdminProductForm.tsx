import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ImagePlus, Save, X } from "lucide-react";
import { toast } from "sonner";

const AdminProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string>("/placeholder.svg");
  const [inStock, setInStock] = useState(true);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(id ? "Produk berhasil diperbarui" : "Produk berhasil ditambahkan");
    setTimeout(() => navigate("/admin/umkm"), 800);
  };

  return (
    <div className="space-y-6">
      <Card className="border shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>{id ? "Edit Produk" : "Tambah Produk"}</CardTitle>
              <CardDescription>Lengkapi informasi produk UMKM</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                <X className="mr-2 h-4 w-4" /> Batal
              </Button>
              <Button type="submit" form="productForm" className="bg-lamsel-green hover:bg-lamsel-green/80">
                <Save className="mr-2 h-4 w-4" /> Simpan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form id="productForm" onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama Produk</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Masukkan nama produk" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Harga</Label>
                <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value === "" ? "" : Number(e.target.value))} placeholder="0" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Deskripsikan produk" className="min-h-[120px]" required />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="inStock" checked={inStock} onCheckedChange={(c) => setInStock(Boolean(c))} />
                <Label htmlFor="inStock" className="cursor-pointer text-sm">
                  {inStock ? "Produk tersedia" : "Produk tidak tersedia"}
                </Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Foto Produk</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center bg-emerald-50/40">
                <ImagePlus className="mx-auto h-12 w-12 text-emerald-400" />
                <p className="text-sm mt-2">Klik untuk upload foto</p>
                <p className="text-xs text-muted-foreground">SVG, PNG, JPG (maks. 2MB)</p>
                <input type="file" className="hidden" onChange={() => setImage("/placeholder.svg")} />
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminProductForm;
