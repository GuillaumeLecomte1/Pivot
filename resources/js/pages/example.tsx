import { Head } from '@inertiajs/react';
import NavbarLayout from '@/layouts/navbar-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Example() {
    return (
        <NavbarLayout>
            <Head title="Exemple" />
            
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Page d'exemple</h1>
                
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Carte 1</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Contenu de la carte 1</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Carte 2</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Contenu de la carte 2</p>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Carte 3</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Contenu de la carte 3</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </NavbarLayout>
    );
} 