<?php
namespace App\Models;

use App\Core\Model;

class Banner extends Model {
    protected $table = 'banners';

    public function getHeroBanners($page = 'home') {
        return $this->db->fetchAll(
            "SELECT * FROM banners WHERE type = 'hero' AND page = ? ORDER BY display_order ASC",
            [$page]
        );
    }

    public function getFeaturedBanners($page = 'home') {
        return $this->db->fetchAll(
            "SELECT * FROM banners WHERE type = 'featured' AND page = ? ORDER BY display_order ASC",
            [$page]
        );
    }
}
