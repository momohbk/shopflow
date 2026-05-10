<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'user_id', 'total', 'status', 'payment_intent_id', 'shipping_address'
    ];

    protected $casts = [
        'total' => 'decimal:2',
    ];
}
