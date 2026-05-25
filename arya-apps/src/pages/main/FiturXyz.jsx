import { Button } from "@/components/ui/button";
import PageHeader from "../../components/PageHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function FiturXyz() {
  return (
    <>
      <PageHeader title="Fitur XYZ" />
      <p>Ini halaman Fitur XYZ</p>

      <Button variant = "destructive">Hapus</Button>
      <Button variant = "outline">Hapus</Button>
      <Button variant = "ghost">Hapus</Button>
      <Button variant = "link">Hapus</Button>  
      <Button variant = "default">Hapus</Button>
      <Button variant = "secondary">Hapus</Button>


            <Card className="mt-4 w-[380px]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Belajar shadcn/ui</CardTitle>
            <Badge variant="secondary">Baru</Badge>
          </div>
          <CardDescription>
            Contoh penggunaan komponen shadcn/ui di React
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Komponen ini dibuat di branch <strong>setup-shadcn</strong>
            lalu di-merge ke main.
          </p>
        </CardContent>

        <CardFooter className="flex gap-2">
          <Button>Simpan</Button>
          <Button variant="outline">Batal</Button>
        </CardFooter>
      </Card>
    </>
  );
}