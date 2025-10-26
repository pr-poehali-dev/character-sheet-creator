import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface CharacterData {
  id: string;
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
  const [characters, setCharacters] = useState<CharacterData[]>([]);
  const [currentCharacterId, setCurrentCharacterId] = useState<string>('');
  const [character, setCharacter] = useState<CharacterData>({
    id: '',
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
    const saved = localStorage.getItem('rpg-characters');
    if (saved) {
      const loadedCharacters = JSON.parse(saved);
      setCharacters(loadedCharacters);
      if (loadedCharacters.length > 0) {
        setCurrentCharacterId(loadedCharacters[0].id);
        setCharacter(loadedCharacters[0]);
      }
    } else {
      const newChar = {
        id: Date.now().toString(),
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
      };
      setCharacters([newChar]);
      setCurrentCharacterId(newChar.id);
      setCharacter(newChar);
      localStorage.setItem('rpg-characters', JSON.stringify([newChar]));
    }
  }, []);

  const updateField = (field: keyof CharacterData, value: string) => {
    const updated = { ...character, [field]: value };
    setCharacter(updated);
    
    const updatedCharacters = characters.map(char => 
      char.id === currentCharacterId ? updated : char
    );
    setCharacters(updatedCharacters);
    localStorage.setItem('rpg-characters', JSON.stringify(updatedCharacters));
  };

  const switchCharacter = (id: string) => {
    const selectedChar = characters.find(char => char.id === id);
    if (selectedChar) {
      setCurrentCharacterId(id);
      setCharacter(selectedChar);
    }
  };

  const createNewCharacter = () => {
    const newChar: CharacterData = {
      id: Date.now().toString(),
      name: 'Новый персонаж',
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
    };
    const updatedCharacters = [...characters, newChar];
    setCharacters(updatedCharacters);
    setCurrentCharacterId(newChar.id);
    setCharacter(newChar);
    localStorage.setItem('rpg-characters', JSON.stringify(updatedCharacters));
  };

  const deleteCharacter = () => {
    if (characters.length <= 1) return;
    
    const updatedCharacters = characters.filter(char => char.id !== currentCharacterId);
    setCharacters(updatedCharacters);
    setCurrentCharacterId(updatedCharacters[0].id);
    setCharacter(updatedCharacters[0]);
    localStorage.setItem('rpg-characters', JSON.stringify(updatedCharacters));
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 L90 50 L50 90 L10 50 Z' fill='none' stroke='%238B4513' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='5' fill='%238B4513'/%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px'
      }}></div>
      
      <div className="absolute top-10 left-10 opacity-20 text-[120px] text-[#8B4513] select-none pointer-events-none">⚔️</div>
      <div className="absolute top-40 right-20 opacity-15 text-[100px] text-[#8B4513] select-none pointer-events-none">🛡️</div>
      <div className="absolute bottom-20 left-20 opacity-20 text-[90px] text-[#8B4513] select-none pointer-events-none">🏰</div>
      <div className="absolute bottom-40 right-10 opacity-15 text-[110px] text-[#8B4513] select-none pointer-events-none">📜</div>
      <div className="absolute top-1/2 left-1/4 opacity-10 text-[80px] text-[#8B4513] select-none pointer-events-none">🗡️</div>
      <div className="absolute top-1/3 right-1/3 opacity-10 text-[95px] text-[#8B4513] select-none pointer-events-none">🔮</div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-6 flex gap-4 items-center print:hidden">
          <Select value={currentCharacterId} onValueChange={switchCharacter}>
            <SelectTrigger className="w-64 dnd-field bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-[#8B4513] font-semibold">
              <SelectValue placeholder="Выберите персонажа" />
            </SelectTrigger>
            <SelectContent>
              {characters.map(char => (
                <SelectItem key={char.id} value={char.id}>
                  {char.name || 'Безымянный персонаж'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <button
            onClick={createNewCharacter}
            className="dnd-field bg-gradient-to-br from-green-100 to-green-50 p-1 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="dnd-field bg-gradient-to-br from-white to-green-50 px-4 py-2 flex items-center gap-2">
              <Icon name="Plus" size={18} className="text-green-700" />
              <span className="font-semibold text-green-700">Новый</span>
            </div>
          </button>
          
          {characters.length > 1 && (
            <button
              onClick={deleteCharacter}
              className="dnd-field bg-gradient-to-br from-red-100 to-red-50 p-1 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="dnd-field bg-gradient-to-br from-white to-red-50 px-4 py-2 flex items-center gap-2">
                <Icon name="Trash2" size={18} className="text-red-700" />
                <span className="font-semibold text-red-700">Удалить</span>
              </div>
            </button>
          )}
        </div>

        <Card className="bg-[#F4E8D0] border-4 border-[#8B4513] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50' y='100' font-size='160' opacity='0.3' fill='%238B4513'%3E⚔%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '400px 400px',
            backgroundPosition: 'center'
          }}></div>

          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-[#D4AF37]">
            <div className="absolute -top-2 -left-2 text-3xl">⚜️</div>
          </div>
          <div className="absolute top-0 right-0 w-20 h-20 border-t-4 border-r-4 border-[#D4AF37]">
            <div className="absolute -top-2 -right-2 text-3xl">⚜️</div>
          </div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-4 border-l-4 border-[#D4AF37]">
            <div className="absolute -bottom-2 -left-2 text-3xl">⚜️</div>
          </div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-[#D4AF37]">
            <div className="absolute -bottom-2 -right-2 text-3xl">⚜️</div>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-center text-[#3E2723] drop-shadow-lg flex-1">
                Лист Персонажа
              </h1>
              <button
                onClick={handlePrint}
                className="dnd-field bg-gradient-to-br from-amber-100 to-amber-50 p-1 shadow-lg hover:shadow-xl transition-all duration-300 print:hidden"
              >
                <div className="dnd-field bg-gradient-to-br from-white to-amber-50 px-6 py-3 flex items-center gap-2">
                  <Icon name="Printer" size={20} className="text-[#3E2723]" />
                  <span className="font-semibold text-[#3E2723]">Печать</span>
                </div>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-6">
                <div className="relative">
                  <Label htmlFor="name" className="text-lg font-semibold text-[#3E2723] mb-2 block">Имя персонажа</Label>
                  <div className="relative dnd-banner bg-gradient-to-br from-amber-100 to-amber-50 p-1 shadow-lg">
                    <Input
                      id="name"
                      value={character.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="dnd-banner bg-gradient-to-br from-amber-50 to-white border-0 text-xl shadow-inner focus:shadow-lg transition-all duration-300 focus:ring-0 px-6 py-4 font-semibold text-[#3E2723] text-center"
                      placeholder="Введите имя"
                    />
                  </div>
                </div>

                <div className="relative">
                  <Label htmlFor="description" className="text-lg font-semibold text-[#3E2723] mb-2 block">Описание внешности</Label>
                  <div className="relative dnd-field bg-gradient-to-br from-amber-100 to-amber-50 p-1 shadow-lg">
                    <Textarea
                      id="description"
                      value={character.description}
                      onChange={(e) => updateField('description', e.target.value)}
                      className="dnd-field bg-gradient-to-br from-amber-50 to-white border-0 mt-2 min-h-24 shadow-inner focus:shadow-lg transition-all duration-300 focus:ring-0 px-5 py-4 leading-relaxed"
                      placeholder="Опишите внешность персонажа"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <Label htmlFor="height" className="text-base font-semibold text-[#3E2723] mb-2 block">Рост</Label>
                    <div className="relative dnd-field bg-gradient-to-br from-amber-100 to-amber-50 p-1 shadow-lg">
                      <Input
                        id="height"
                        value={character.height}
                        onChange={(e) => updateField('height', e.target.value)}
                        className="dnd-field bg-gradient-to-br from-amber-50 to-white border-0 shadow-inner focus:shadow-lg transition-all duration-300 focus:ring-0 px-4 py-3 text-center"
                        placeholder="см"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Label htmlFor="weight" className="text-base font-semibold text-[#3E2723] mb-2 block">Вес</Label>
                    <div className="relative dnd-field bg-gradient-to-br from-amber-100 to-amber-50 p-1 shadow-lg">
                      <Input
                        id="weight"
                        value={character.weight}
                        onChange={(e) => updateField('weight', e.target.value)}
                        className="dnd-field bg-gradient-to-br from-amber-50 to-white border-0 shadow-inner focus:shadow-lg transition-all duration-300 focus:ring-0 px-4 py-3 text-center"
                        placeholder="кг"
                      />
                    </div>
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

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="hp" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Heart" size={18} className="text-red-600" />
                  HP
                </Label>
                <div className="dnd-shield bg-gradient-to-br from-red-100 to-red-50 p-1.5 shadow-xl w-28 h-28 flex items-center justify-center">
                  <Input
                    id="hp"
                    value={character.hp}
                    onChange={(e) => updateField('hp', e.target.value)}
                    className="dnd-shield bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="armorClass" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Shield" size={18} className="text-blue-600" />
                  Защита
                </Label>
                <div className="dnd-shield bg-gradient-to-br from-blue-100 to-blue-50 p-1.5 shadow-xl w-28 h-28 flex items-center justify-center">
                  <Input
                    id="armorClass"
                    value={character.armorClass}
                    onChange={(e) => updateField('armorClass', e.target.value)}
                    className="dnd-shield bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="combat" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Sword" size={18} className="text-orange-600" />
                  Бой
                </Label>
                <div className="dnd-stat-hexagon bg-gradient-to-br from-orange-100 to-orange-50 p-1.5 shadow-xl w-24 h-24 flex items-center justify-center">
                  <Input
                    id="combat"
                    value={character.combat}
                    onChange={(e) => updateField('combat', e.target.value)}
                    className="dnd-stat-hexagon bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="perception" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Eye" size={18} className="text-purple-600" />
                  Восприятие
                </Label>
                <div className="dnd-stat-hexagon bg-gradient-to-br from-purple-100 to-purple-50 p-1.5 shadow-xl w-24 h-24 flex items-center justify-center">
                  <Input
                    id="perception"
                    value={character.perception}
                    onChange={(e) => updateField('perception', e.target.value)}
                    className="dnd-stat-hexagon bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="intelligence" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Brain" size={18} className="text-indigo-600" />
                  Интеллект
                </Label>
                <div className="dnd-stat-hexagon bg-gradient-to-br from-indigo-100 to-indigo-50 p-1.5 shadow-xl w-24 h-24 flex items-center justify-center">
                  <Input
                    id="intelligence"
                    value={character.intelligence}
                    onChange={(e) => updateField('intelligence', e.target.value)}
                    className="dnd-stat-hexagon bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="constitution" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Dumbbell" size={18} className="text-green-600" />
                  Телосложение
                </Label>
                <div className="dnd-stat-hexagon bg-gradient-to-br from-green-100 to-green-50 p-1.5 shadow-xl w-24 h-24 flex items-center justify-center">
                  <Input
                    id="constitution"
                    value={character.constitution}
                    onChange={(e) => updateField('constitution', e.target.value)}
                    className="dnd-stat-hexagon bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="dexterity" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Zap" size={18} className="text-yellow-600" />
                  Ловкость
                </Label>
                <div className="dnd-stat-hexagon bg-gradient-to-br from-yellow-100 to-yellow-50 p-1.5 shadow-xl w-24 h-24 flex items-center justify-center">
                  <Input
                    id="dexterity"
                    value={character.dexterity}
                    onChange={(e) => updateField('dexterity', e.target.value)}
                    className="dnd-stat-hexagon bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="relative p-6 flex flex-col items-center">
                <Label htmlFor="magic" className="text-sm font-semibold text-[#3E2723] flex items-center gap-2 mb-4">
                  <Icon name="Sparkles" size={18} className="text-violet-600" />
                  Магия
                </Label>
                <div className="dnd-stat-hexagon bg-gradient-to-br from-violet-100 to-violet-50 p-1.5 shadow-xl w-24 h-24 flex items-center justify-center">
                  <Input
                    id="magic"
                    value={character.magic}
                    onChange={(e) => updateField('magic', e.target.value)}
                    className="dnd-stat-hexagon bg-white/95 border-0 text-center text-2xl font-bold shadow-inner focus:ring-0 w-full h-full"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <Label htmlFor="spells" className="text-lg font-semibold text-[#3E2723] flex items-center gap-2 mb-3">
                  <Icon name="Wand2" size={22} className="text-purple-600" />
                  Заклинания
                </Label>
                <div className="dnd-field bg-gradient-to-br from-purple-100 to-purple-50 p-1.5 shadow-xl">
                  <Textarea
                    id="spells"
                    value={character.spells}
                    onChange={(e) => updateField('spells', e.target.value)}
                    className="dnd-field bg-gradient-to-br from-white to-purple-50/30 border-0 min-h-32 shadow-inner focus:shadow-lg transition-all duration-300 focus:ring-0 px-5 py-4 leading-relaxed"
                    placeholder="Список известных заклинаний"
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="inventory" className="text-lg font-semibold text-[#3E2723] flex items-center gap-2 mb-3">
                  <Icon name="Backpack" size={22} className="text-amber-700" />
                  Инвентарь
                </Label>
                <div className="dnd-field bg-gradient-to-br from-amber-100 to-amber-50 p-1.5 shadow-xl">
                  <Textarea
                    id="inventory"
                    value={character.inventory}
                    onChange={(e) => updateField('inventory', e.target.value)}
                    className="dnd-field bg-gradient-to-br from-white to-amber-50/30 border-0 min-h-32 shadow-inner focus:shadow-lg transition-all duration-300 focus:ring-0 px-5 py-4 leading-relaxed"
                    placeholder="Список предметов и снаряжения"
                  />
                </div>
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