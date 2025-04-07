import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';

const GhibliStyleGenerator = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('/api/generate-image', formData);
      setGeneratedImage(response.data.image);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-xl p-6 bg-white shadow-xl rounded-2xl">
        <CardContent>
          <h1 className="text-2xl font-bold mb-4">Studio Ghibli Style Image Generator</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Textarea placeholder="Describe what you want (e.g., rainy cityscape, cozy room, etc.)" value={description} onChange={(e) => setDescription(e.target.value)} required />
            <Input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required />
            <Button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Image'}
            </Button>
          </form>
          {generatedImage && (
            <div className="mt-4">
              <img src={generatedImage} alt="Generated Studio Ghibli Style" className="w-full h-auto rounded-lg" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default GhibliStyleGenerator;
