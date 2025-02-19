import { Select } from '@radix-ui/themes'
import React from 'react'

interface StatusItem {
  value: string;
  name: string;
}

interface StatusSelectorProps {
  placeholder: string;
  label: string;
  items: StatusItem[];
  onChange: (value: string) => void;
}

const StatusSelector: React.FC<StatusSelectorProps> = ({ placeholder, label, items, onChange }) => {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger placeholder={placeholder} />
      <Select.Content>
        <Select.Group>
          <Select.Label>{label}</Select.Label>
          {items.map((item, index) => (
            <Select.Item key={index} value={item.value}>
              {item.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  )
}

export default StatusSelector;
