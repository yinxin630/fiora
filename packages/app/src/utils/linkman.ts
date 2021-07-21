import { Friend, Group, Linkman } from '../types/redux';

export function formatLinkmanName(linkman: Linkman) {
    if (linkman!.type === 'group' && (linkman as Group).members.length > 0) {
        return `${(linkman as Group).name} (${(linkman as Group).members.length})`;
    } if (linkman!.type !== 'group' && (linkman as Friend).isOnline !== undefined) {
        return `${(linkman as Friend).name} (${(linkman as Friend).isOnline ? '在线' : '离线'})`;
    }
    return linkman.name;
}
