'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { ChangeEvent } from 'react';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    router.replace(
        currentPathname.replace(`/${currentLocale}/`, `/${newLocale}/`)
      );

      i18n.changeLanguage(newLocale);
  };

  return (
    <select onChange={handleChange} value={currentLocale} className="text-primary font-secondary hover:underline active:underline bg-theme-surface-primary">
      <option value="fi">Suomi</option>
      <option value="sv">Svenska</option>
      <option value="en">English</option>
    </select>
  );
}
