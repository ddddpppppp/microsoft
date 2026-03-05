<?php
namespace App\Utils;

class ArrayHelper {
    /**
     * Convert list to map/list-map by key.
     *
     * @param array $data
     * @param string $key
     * @param int $level 2 => key => row, 3 => key => [rows]
     * @return array
     */
    public static function setKey(array $data, string $key, int $level = 2): array {
        if (empty($data)) {
            return [];
        }

        $ret = [];
        foreach ($data as $row) {
            if (!is_array($row) || !array_key_exists($key, $row)) {
                $ret[] = $row;
                continue;
            }

            $index = $row[$key];
            if ($level === 2) {
                if (!isset($ret[$index])) {
                    $ret[$index] = $row;
                }
                continue;
            }

            if ($level === 3) {
                if (!isset($ret[$index])) {
                    $ret[$index] = [];
                }
                $ret[$index][] = $row;
            }
        }

        return $ret;
    }
}
