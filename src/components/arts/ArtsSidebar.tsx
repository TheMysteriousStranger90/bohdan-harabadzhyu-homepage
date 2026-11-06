import React, { useEffect, useId, useRef, useState } from 'react';
import {
  Box,
  chakra,
  Collapse,
  Image,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { FiChevronUp, FiChevronDown, FiPenTool, FiMusic } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import { useLanguage } from '@/context/LanguageContext';
import translations from '@/data/translations';

export interface Poem {
  id: number;
  title: string;
  url: string;
  stanzas: string[];
}

export interface Track {
  id: number;
  title: string;
  url: string;
}

interface ArtsSidebarProps {
  poems: Poem[];
  tracks: Track[];
  selectedPoemId: number | null;
  selectedTrackId: number | null;
  /** Called after an item link is activated (drawer variant closes first, then parent navigates). */
  onNavigate?: (href: string) => void;
  variant?: 'static' | 'drawer';
}

interface SidebarSectionProps {
  label: string;
  icon: IconType;
  open: boolean;
  onToggle: () => void;
  sectionRef?: React.Ref<HTMLDivElement>;
  children: React.ReactNode;
  colors: {
    text: string;
    hoverBg: string;
    chevron: string;
    iconBg: string;
    iconColor: string;
    focus: string;
  };
}

/** Collapsible section: a real <button> header (keyboard + screen reader friendly) and a list. */
const SidebarSection: React.FC<SidebarSectionProps> = ({
                                                         label, icon: SectionIcon, open, onToggle, sectionRef, children, colors,
                                                       }) => {
  const panelId = useId();

  return (
    <Box ref={sectionRef}>
      <chakra.button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        display="flex"
        alignItems="center"
        gap={2}
        w="full"
        textAlign="left"
        cursor="pointer"
        py={2}
        px={2}
        borderRadius="md"
        userSelect="none"
        _hover={{ bg: colors.hoverBg }}
        _focusVisible={{ outline: '2px solid', outlineColor: colors.focus, outlineOffset: '2px' }}
      >
        {/* Round icon badge — matches ContactIcon style */}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="34px"
          h="34px"
          borderRadius="full"
          bg={colors.iconBg}
          color={colors.iconColor}
          flexShrink={0}
          aria-hidden="true"
        >
          <SectionIcon size={15} />
        </Box>
        <Text
          as="span"
          color={colors.text}
          fontFamily="var(--font-lora)"
          fontWeight="700"
          fontSize="sm"
          letterSpacing="wider"
          flex="1"
        >
          {label}
        </Text>
        {open
          ? <FiChevronUp color={colors.chevron} size={16} aria-hidden="true" />
          : <FiChevronDown color={colors.chevron} size={16} aria-hidden="true" />}
      </chakra.button>

      <Collapse in={open} animateOpacity>
        <List id={panelId} spacing={0} pl={2} mt={1}>
          {children}
        </List>
      </Collapse>
    </Box>
  );
};

interface SidebarLinkProps {
  href: string;
  selected: boolean;
  onNavigate?: (href: string) => void;
  children: React.ReactNode;
  colors: {
    text: string;
    muted: string;
    hoverBg: string;
    selected: string;
    selectedBg: string;
  };
}

/** One poem/track. A real link, so it is focusable, middle-clickable and copyable (/arts?poem=3). */
const SidebarLink: React.FC<SidebarLinkProps> = ({ href, selected, onNavigate, children, colors }) => {
  // In the drawer: close first, then let the parent navigate on Drawer onCloseComplete.
  // Ctrl/Cmd/middle-click still open the link normally.
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!onNavigate) return; // desktop sidebar: plain NextLink navigation
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.blur(); // don't leave focus on an element that is about to disappear
    onNavigate(href);
  };

  return (
    <ListItem>
      <Link
        as={NextLink}
        href={href}
        shallow
        replace
        scroll={false}
        onClick={handleClick}
        aria-current={selected ? 'page' : undefined}
        display="block"
        py={1.5}
        px={3}
        fontSize="sm"
        fontFamily="var(--font-lora)"
        borderRadius="md"
        color={selected ? colors.selected : colors.muted}
        fontWeight={selected ? '600' : '400'}
        bg={selected ? colors.selectedBg : 'transparent'}
        borderLeft={`2px solid ${selected ? colors.selected : 'transparent'}`}
        transition="color 0.15s, background-color 0.15s"
        _hover={{ color: colors.text, bg: colors.hoverBg, textDecoration: 'none' }}
        _focusVisible={{ outline: '2px solid', outlineColor: colors.selected, outlineOffset: '2px' }}
      >
        {children}
      </Link>
    </ListItem>
  );
};

const ArtsSidebar: React.FC<ArtsSidebarProps> = ({
                                                   poems, tracks, selectedPoemId, selectedTrackId, onNavigate, variant = 'static',
                                                 }) => {
  // The section holding the current selection starts expanded
  // (the drawer remounts on every open, so initial state matters)
  const [poemsOpen, setPoemsOpen] = useState(selectedTrackId === null);
  const [musicOpen, setMusicOpen] = useState(selectedTrackId !== null);

  // Keep the active section expanded when the selection changes
  useEffect(() => {
    if (selectedTrackId !== null) setMusicOpen(true);
  }, [selectedTrackId]);

  useEffect(() => {
    if (selectedPoemId !== null) setPoemsOpen(true);
  }, [selectedPoemId]);

  const musicSectionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (variant !== 'drawer' || !musicOpen) return;
    const id = window.setTimeout(() => {
      musicSectionRef.current?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 350);
    return () => window.clearTimeout(id);
  }, [musicOpen, variant]);

  const { language } = useLanguage();
  const t = translations[language];

  // Match main page color scheme
  const sidebarBg = useColorModeValue('#d1e7f8', '#1a1a1e');
  const borderColor = useColorModeValue('#93c5fd', '#2a2a2e');
  const textColor = useColorModeValue('#202023', '#f7fafc');
  const mutedText = useColorModeValue('#4b5563', '#9ca3af');
  const hoverBg = useColorModeValue('rgba(19,99,210,0.06)', 'rgba(255,255,255,0.05)');
  const selectedColor = useColorModeValue('#1363d2', '#c084fc');
  const selectedBg = useColorModeValue('rgba(19,99,210,0.12)', 'rgba(192,132,252,0.08)');
  const chevronColor = useColorModeValue('#1363d2', '#68217a');

  const profileBorderColor = useColorModeValue('#0d47a1', '#222224');
  const profileBoxShadow = useColorModeValue(
    '0 4px 6px rgba(0, 0, 0, 0.1)',
    '0 4px 6px rgba(0, 0, 0, 0.6)',
  );

  // Icon badge — same colors as ContactIcon
  const iconBg = useColorModeValue('#1363d2', '#68217a');
  const iconColor = useColorModeValue('#202023', '#f7fafc');

  const sectionColors = {
    text: textColor,
    hoverBg,
    chevron: chevronColor,
    iconBg,
    iconColor,
    focus: selectedColor,
  };
  const linkColors = {
    text: textColor,
    muted: mutedText,
    hoverBg,
    selected: selectedColor,
    selectedBg,
  };

  return (
    <Box
      as="nav"
      aria-label="Arts"
      w={variant === 'drawer' ? 'full' : { base: '200px', md: '240px' }}
      h="full"
      flex={variant === 'drawer' ? '1 1 auto' : undefined}
      minH={0}
      bg={sidebarBg}
      borderRight={variant === 'drawer' ? 'none' : `1px solid ${borderColor}`}
      pt={6}
      pb={variant === 'drawer' ? 'calc(1.5rem + env(safe-area-inset-bottom))' : 6}
      px={4}
      flexShrink={variant === 'drawer' ? 1 : 0}
      overflowY="auto"
      overscrollBehavior="contain"
    >
      {/* Photo2 — back to homepage */}
      <NextLink href="/">
        <Box
          display="block"
          cursor="pointer"
          mb={3}
          w="fit-content"
          mx="auto"
        >
          <Image
            src="/Photo2.png"
            alt="Bogdan Garabagiu"
            borderRadius="full"
            w="160px"
            h="160px"
            objectFit="cover"
            border={`0.5px solid ${profileBorderColor}`}
            boxShadow={profileBoxShadow}
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{
              transform: 'scale(1.05)',
              boxShadow: '0 8px 12px rgba(0, 0, 0, 0.2)',
            }}
          />
        </Box>
      </NextLink>

      <Box h={6} />

      {/* POEMS / СТИХИ section */}
      <Box mb={4}>
        <SidebarSection
          label={t.arts.poems}
          icon={FiPenTool}
          open={poemsOpen}
          onToggle={() => setPoemsOpen(v => !v)}
          colors={sectionColors}
        >
          {poems.map(poem => (
            <SidebarLink
              key={poem.id}
              href={`/arts?poem=${poem.id}`}
              selected={selectedPoemId === poem.id}
              onNavigate={onNavigate}
              colors={linkColors}
            >
              {poem.title}
            </SidebarLink>
          ))}
        </SidebarSection>
      </Box>

      {/* MUSIC / МУЗЫКА section */}
      <SidebarSection
        label={t.arts.music}
        icon={FiMusic}
        open={musicOpen}
        onToggle={() => setMusicOpen(v => !v)}
        sectionRef={musicSectionRef}
        colors={sectionColors}
      >
        {tracks.map(track => (
          <SidebarLink
            key={track.id}
            href={`/arts?track=${track.id}`}
            selected={selectedTrackId === track.id}
            onNavigate={onNavigate}
            colors={linkColors}
          >
            {track.title}
          </SidebarLink>
        ))}
      </SidebarSection>
    </Box>
  );
};

export default ArtsSidebar;
