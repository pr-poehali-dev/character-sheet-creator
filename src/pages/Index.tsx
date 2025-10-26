import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

interface CharacterData {
  name: string;
  description: string;
  height: string;
  weight: string;
  hp: string;
  armorClass: string;
  combat: string;
  perception: string;
  intelligence: string;
  constitution: string;
  dexterity: string;
  magic: string;
  spells: string;
  inventory: string;
  photo: string;
}

const Index = () => {
  const [character, setCharacter] = useState<CharacterData>({
    name: '',
    description: '',
    height: '',
    weight: '',
    hp: '',
    armorClass: '',
    combat: '',
    perception: '',
    intelligence: '',
    constitution: '',
    dexterity: '',
    magic: '',
    spells: '',
    inventory: '',
    photo: ''
  });

  useEffect(() => {
    const saved = localStorage.getItem('rpg-character');
    if (saved) {
      setCharacter(JSON.parse(saved));
    }
  }, []);

  const updateField = (field: keyof CharacterData, value: string) => {
    const updated = { ...character, [field]: value };
    setCharacter(updated);
    localStorage.setItem('rpg-character', JSON.stringify(updated));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField('photo', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-[#F4E8D0] border-4 border-[#8B4513] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-[#D4AF37]"></div>
          <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-[#D4AF37]"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-[#D4AF37]"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-[#D4AF37]"></div>
          
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3E2723] mb-8 drop-shadow-lg">
              Лист Персонажа
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg font-semibold text-[#3E2723]">Имя персонажа</Label>
                  <Input
                    id="name"
                    value={character.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="bg-white/80 border-2 border-[#8B4513] text-lg mt-2"
                    placeholder="Введите имя"
                  />
                </div>

                <div>
                  <Label htmlFor="description" className="text-lg font-semibold text-[#3E2723]">Описание внешности</Label>
                  <Textarea
                    id="description"
                    value={character.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="bg-white/80 border-2 border-[#8B4513] mt-2 min-h-24"
                    placeholder="Опишите внешность персонажа"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height" className="text-base font-semibold text-[#3E2723]">Рост</Label>
                    <Input
                      id="height"
                      value={character.height}
                      onChange={(e) => updateField('height', e.target.value)}
                      className="bg-white/80 border-2 border-[#8B4513] mt-2"
                      placeholder="см"
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight" className="text-base font-semibold text-[#3E2723]">Вес</Label>
                    <Input
                      id="weight"
                      value={character.weight}
                      onChange={(e) => updateField('weight', e.target.value)}
                      className="bg-white/80 border-2 border-[#8B4513] mt-2"
                      placeholder="кг"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <Label className="text-lg font-semibold text-[#3E2723] mb-2">Портрет</Label>
                <div className="w-full aspect-square border-4 border-[#8B4513] bg-white/60 rounded-lg overflow-hidden shadow-lg">
                  {character.photo ? (
                    <img src={character.photo} alt="Персонаж" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8B4513]">
                      <Icon name="User" size={64} />
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="mt-4 text-sm text-[#3E2723]"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="hp" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Heart" size={18} className="text-red-600" />
                  HP
                </Label>
                <Input
                  id="hp"
                  value={character.hp}
                  onChange={(e) => updateField('hp', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="armorClass" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Shield" size={18} className="text-blue-600" />
                  Класс защиты
                </Label>
                <Input
                  id="armorClass"
                  value={character.armorClass}
                  onChange={(e) => updateField('armorClass', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="combat" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Sword" size={18} className="text-orange-600" />
                  Бой
                </Label>
                <Input
                  id="combat"
                  value={character.combat}
                  onChange={(e) => updateField('combat', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="perception" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Eye" size={18} className="text-purple-600" />
                  Восприятие
                </Label>
                <Input
                  id="perception"
                  value={character.perception}
                  onChange={(e) => updateField('perception', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="intelligence" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Brain" size={18} className="text-indigo-600" />
                  Интеллект
                </Label>
                <Input
                  id="intelligence"
                  value={character.intelligence}
                  onChange={(e) => updateField('intelligence', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="constitution" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Dumbbell" size={18} className="text-green-600" />
                  Телосложение
                </Label>
                <Input
                  id="constitution"
                  value={character.constitution}
                  onChange={(e) => updateField('constitution', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="dexterity" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Zap" size={18} className="text-yellow-600" />
                  Ловкость
                </Label>
                <Input
                  id="dexterity"
                  value={character.dexterity}
                  onChange={(e) => updateField('dexterity', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>

              <div className="bg-white/60 p-4 rounded border-2 border-[#8B4513]">
                <Label htmlFor="magic" className="text-base font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Sparkles" size={18} className="text-violet-600" />
                  Магия
                </Label>
                <Input
                  id="magic"
                  value={character.magic}
                  onChange={(e) => updateField('magic', e.target.value)}
                  className="bg-white border-[#8B4513] mt-2"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="spells" className="text-lg font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Wand2" size={20} className="text-purple-600" />
                  Заклинания
                </Label>
                <Textarea
                  id="spells"
                  value={character.spells}
                  onChange={(e) => updateField('spells', e.target.value)}
                  className="bg-white/80 border-2 border-[#8B4513] mt-2 min-h-32"
                  placeholder="Список известных заклинаний"
                />
              </div>

              <div>
                <Label htmlFor="inventory" className="text-lg font-semibold text-[#3E2723] flex items-center gap-2">
                  <Icon name="Backpack" size={20} className="text-amber-600" />
                  Инвентарь
                </Label>
                <Textarea
                  id="inventory"
                  value={character.inventory}
                  onChange={(e) => updateField('inventory', e.target.value)}
                  className="bg-white/80 border-2 border-[#8B4513] mt-2 min-h-32"
                  placeholder="Список предметов и снаряжения"
                />
              </div>
            </div>

            <div className="mt-8 text-center text-sm text-[#8B4513] italic">
              Все изменения сохраняются автоматически
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Index;
