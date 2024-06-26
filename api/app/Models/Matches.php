<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Matches extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'user2_id', 'status'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function user2()
    {
        return $this->belongsTo(User::class);
    }
}
