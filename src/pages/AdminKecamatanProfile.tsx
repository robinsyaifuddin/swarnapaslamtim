import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Save, X, MapPin } from "lucide-react";
import { lampungTimurDistricts } from "@/data/lampungTimurDistricts";
import { toast } from "sonner";

const AdminKecamatanProfile: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const districtId = Number(id);

  const district = useMemo(() => lampungTimurDistricts.find(d => d.id === districtId), [districtId]);

  const [leader, setLeader] = useState<string>(district?.leader || "");
  const [address, setAddress] = useState<string>(district?.address || "");
  const [phone, setPhone] = useState<string>(district?.phone || "");
  const [email, setEmail] = useState<string>(district?.email || "");
  const [website, setWebsite] = useState<string>(district?.website || "");
  const [description, setDescription] = useState<string>(district?.description || "");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Profil kecamatan berhasil diperbarui");
    setTimeout(() => navigate("/admin/manager"), 800);
  };

  if (!district) {
    return (
      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Data Kecamatan tidak ditemukan</CardTitle>
            <CardDescription>Periksa kembali tautan atau pilih kecamatan lain.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" onClick={() => navigate(-1)}>Kembali</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Edit Profil Kecamatan</CardTitle>
              <CardDescription>{district.name}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                <X className="mr-2 h-4 w-4" /> Batal
              </Button>
              <Button type="submit" form="kecamatanProfileForm" className="bg-lamsel-green hover:bg-lamsel-green/80">
                <Save className="mr-2 h-4 w-4" /> Simpan
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form id="kecamatanProfileForm" onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="leader">Nama Camat</Label>
              <Input id="leader" value={leader} onChange={(e) => setLeader(e.target.value)} placeholder="Nama Camat" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Alamat</Label>
              <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Alamat Kantor Kecamatan" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">No. Telepon</Label>
              <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Nomor telepon" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contoh@kecamatan.go.id" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input id="website" value={website} onChange={(e) => setWebsite(e.target.value)} placeholder="website.kecamatan.go.id" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={6} placeholder="Deskripsi singkat kecamatan" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminKecamatanProfile;
